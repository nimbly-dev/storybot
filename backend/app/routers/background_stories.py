import sqlalchemy
from app.logs.Logging import create_background_story_log
from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import true


from app.utilities import database, hashing, oauth2
from app.model import db_models
from app.model.schema.users import User
from app.model.schema.background_story import (
    BackgroundStory,
    ShowBackgroundStory,
    BackgroundStoryBase,
    ShowSharedBackgroundStories,
)

router = APIRouter(prefix="/background-story", tags={"Background-Story"})

# Get all background story of user
@router.get(
    "/",
    status_code=200,
    response_model=List[ShowBackgroundStory],
    description="Get all background story of current user",
)
def get_all_background_story(
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user),
):
    background_stories_of_current_user = list(
        db.query(db_models.BackgroundStory).filter(
            db_models.BackgroundStory.user_id == current_user.id
        )
    )
    # user_background_story = db.query(db_models.BackgroundStory).all()
    create_background_story_log(f'{current_user.id} has accessed his/her background story')
    return background_stories_of_current_user


# Get all shared background story of users
@router.get(
    "/shared-background-stories",
    status_code=status.HTTP_200_OK,
    response_model=List[ShowSharedBackgroundStories],
    description="Get all shared background story of users",
)
def get_shared_background_stories(
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user),
):
    # get_username = db.query(db_models.User)
    shared_background_stories = list(
        db.query(db_models.BackgroundStory).filter(
            db_models.BackgroundStory.is_shared == True
        )
    )
    create_background_story_log(f'{current_user.id} has accessed all shared background story')
    return shared_background_stories


# creates a background story for the user
@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=ShowBackgroundStory,
    description="creates a background story for the current user",
)
def create_background_story(
    request: BackgroundStoryBase,
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user),
):
    if (
        request.title.isdigit()
        or request.body.isdigit()
        or request.character_name.isdigit()
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Input provided are not valid",
        )

    new_background_story = db_models.BackgroundStory(
        title=request.title,
        body=request.body,
        character_name=request.character_name,
        is_shared=request.is_shared,
        user_id=current_user.id,
    )
    create_background_story_log(f'{current_user.id} has created new bgstory')
    db.add(new_background_story)
    db.commit()
    db.refresh(new_background_story)
    return new_background_story


# Gets the background story by id
@router.get(
    "/{id}",
    status_code=status.HTTP_200_OK,
    response_model=ShowBackgroundStory,
    description="Gets the current user background stories by id",
)
def get_background_story(
    id,
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user),
):
    background_story = (
        db.query(db_models.BackgroundStory)
        .filter(db_models.BackgroundStory.id == id)
        .first()
    )
    if not background_story:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Background story with the id {id} is not found",
        )
    create_background_story_log(f'{current_user.id} has accessed bgstory {background_story.id}')
    return background_story


# Updates the background story by id
@router.put(
    "/{id}",
    status_code=status.HTTP_202_ACCEPTED,
    description="Updates the current user background story by id",
)
def update_background_story(
    id,
    request: BackgroundStory,
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user),
):
    background_story = db.query(db_models.BackgroundStory).filter(
        db_models.BackgroundStory.id == id
    )
    if not background_story.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Background story with id {id} is not found",
        )
    if current_user.id != background_story.first().user_id:
        create_background_story_log(f'User with id {current_user.id} has illegally accessed bgstory with id {id}')
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"You do not have access to this background story",
        )
    if (
        request.title.isdigit()
        or request.body.isdigit()
        or request.character_name.isdigit()
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Input provided are not valid",
        )
    background_story.update(
        {
            "title": request.title,
            "body": request.body,
            "character_name": request.character_name,
            "is_shared": request.is_shared,
        }
    )
    db.commit()
    create_background_story_log(f'{current_user.id} has updated bgstory {id}')
    return {"Update": f"Background story with id {id} has been updated"}


# Delete a background story by id
@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    description="Delete a current user background story by id",
)
def delete_background_story(
    id,
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user),
):
    background_story = db.query(db_models.BackgroundStory).filter(
        db_models.BackgroundStory.id == id
    )

    if not background_story.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Background story with id {id} not found",
        )
    if current_user.id != background_story.first().user_id:
        create_background_story_log(f'User with id {current_user.id} has illegally accessed bgstory with id {id}')
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"You do not have access to this background story",
        )

    background_story.delete(synchronize_session=False)
    db.commit()
    create_background_story_log(f'User with {current_user.id} id has deleted bgstory id {id}')
    return {"Success": "Background story with id {id} has been deleted"}


# Like the story by id
@router.post(
    "/like/{id}",
    status_code=status.HTTP_202_ACCEPTED,
    description="Like the shared story"
)
def like_story(
    id,
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user)
):
    try:
        background_story = db.query(db_models.BackgroundStory).filter(
            db_models.BackgroundStory.id == id
        )
        if not background_story.first():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Background story with id {id} is not found",
            )
        if background_story.first().is_shared == False:
            create_background_story_log(f'User with id {current_user.id} has illegally accessed bgstory with id {id}')
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"The story is not shared",
            )
        new_like_list = db_models.Likes_list(
            user_id = current_user.id,
            background_story_id = id
        )
        db.add(new_like_list)
        db.commit()
        db.refresh(new_like_list)
        return {"Liked": f"{current_user.username} has liked background story with id {id} "}
    except sqlalchemy.exc.IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail=f"User with id {current_user.id} already liked background story with id {id}"
        )

# Get current likes of the story by id
@router.get(
    "/like/{id}",
    status_code=status.HTTP_202_ACCEPTED,
    description="Get likes of the shared story"
)
def get_likes_of_story(
    id,
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user)
):
    count_likes = list (
        db.query(db_models.Likes_list.background_story_id)
                .filter(db_models.Likes_list.background_story_id == id)
    )
        # .filter(db_models.Likes_list.background_story_id == id)
        # .first()
    if not count_likes:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Background story with id {id} is not found",
        )
    # if likes_list.first().is_shared == False:
    #     create_background_story_log(f'User with id {current_user.id} has illegally accessed bgstory with id {id}')
    #     raise HTTPException(
    #         status_code=status.HTTP_403_FORBIDDEN,
    #         detail=f"The story is not shared",
    #     )
    return len(count_likes)
    
@router.delete(
    "/like/{id}",
    status_code=status.HTTP_202_ACCEPTED,
    description="Unlike the story"
)
def unlike_story(
    id,
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user)
):
    liked_background_story = db.query(db_models.Likes_list).filter(db_models.Likes_list.user_id == id).first()

    if not liked_background_story :
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Background story with id {id} not found",
        )
    # if current_user.id != liked_background_story.user_id:
    #     create_background_story_log(f'User with id {current_user.id} has illegally accessed bgstory with id {id}')
    #     raise HTTPException(
    #         status_code=status.HTTP_403_FORBIDDEN,
    #         detail=f"You do not have access to this background story",
    #     )
    

    liked_background_story.delete(synchronize_session=False)
    db.commit()
    # create_background_story_log(f'User with {current_user.id} id has deleted bgstory id {id}')
    return {"Success": "Unlike background story with id {id} has been deleted"}


# Copy background story by id
@router.post(
    "/copy/{id}",
    status_code=status.HTTP_202_ACCEPTED,
    description="Copy a shared story by ID",
)
def copy_shared_story(
    id,
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user),
):
    background_story = db.query(db_models.BackgroundStory).filter(
        db_models.BackgroundStory.id == id
    )
    if not background_story.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Background story with id {id} is not found",
        )
    if background_story.first().is_shared == False:
        create_background_story_log(f'User with id {current_user.id} has illegally accessed bgstory with id {id}')
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"The story is not shared",
        )
    new_background_story = db_models.BackgroundStory(
        title=background_story.first().title,
        body=background_story.first().body,
        character_name=background_story.first().character_name,
        is_shared=False,
        user_id=current_user.id,
    )
    db.add(new_background_story)
    db.commit()
    db.refresh(new_background_story)
    create_background_story_log(f'User with {current_user.id} has copied bgstory id {id} ')
    return new_background_story
