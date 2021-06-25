from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from typing import List
from sqlalchemy.orm import Session

from app.utilities import database, hashing, oauth2
from app.model import schemas, db_models


router = APIRouter(prefix="/background-story", tags={"Background-Story"})

# Get all background story of user
@router.get(
    "/", status_code=200, response_model=List[schemas.ShowAllBackgroundStoryUser]
)
def get_all_background_story(
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(oauth2.get_current_user),
):
    user_background_story = db.query(db_models.BackgroundStory).all()
    return user_background_story


# creates a background story for the user
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_background_story(
    request: schemas.BackgroundStory,
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(oauth2.get_current_user),
):
    new_background_story = db_models.BackgroundStory(
        title=request.title,
        body=request.body,
        character_name=request.body,
        is_shared=request.is_shared,
        user_id=request.user_id,
    )
    db.add(new_background_story)
    db.commit()
    db.refresh(new_background_story)
    return new_background_story


# Gets the background story by id
@router.get(
    "/{id}", status_code=status.HTTP_200_OK, response_model=schemas.ShowBackgroundStory
)
def get_background_story(
    id,
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(oauth2.get_current_user),
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
    return background_story


# Updates the background story by id
@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update(
    id,
    request: schemas.BackgroundStory,
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(oauth2.get_current_user),
):
    background_story = db.query(db_models.BackgroundStory).filter(
        db_models.BackgroundStory.id == id
    )
    if not background_story.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Background story with id {id} is not found",
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
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def destroy(
    id,
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(oauth2.get_current_user),
):
    background_story = db.query(db_models.BackgroundStory).filter(
        db_models.BackgroundStory.id == id
    )

    if not background_story.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Background story with id {id} not found",
        )

    background_story.delete(synchronize_session=False)
    db.commit()
    return {"Success": "Background story with id {id} has been deleted"}