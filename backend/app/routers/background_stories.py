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
    ShowAllBackgroundStoryUser,
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
    user_background_story = db.query(db_models.BackgroundStory).all()
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
    shared_background_stories = list(
        db.query(db_models.BackgroundStory).filter(
            db_models.BackgroundStory.is_shared == True
        )
    )

    return shared_background_stories


# creates a background story for the user
@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    description="creates a background story for the current user",
)
def create_background_story(
    request: BackgroundStory,
    db: Session = Depends(database.get_db),
    current_user: User = Depends(oauth2.get_current_user),
):
    new_background_story = db_models.BackgroundStory(
        title=request.title,
        body=request.body,
        character_name=request.body,
        is_shared=request.is_shared,
        user_id=current_user.id,
    )
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
    if current_user.id != background_story.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"You do not have access to this background story",
        )
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
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"You do not have access to this background story",
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
    return {"Update": "Background story with id {id} has been updated"}


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
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"You do not have access to this background story",
        )

    background_story.delete(synchronize_session=False)
    db.commit()
    return {"Success": "Background story with id {id} has been deleted"}
