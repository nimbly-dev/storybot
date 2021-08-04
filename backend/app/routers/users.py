from app.logs.Logging import create_users_log
from app.model.schema.authentication import TokenData
from app import routers
from fastapi import APIRouter, HTTPException, status, Request
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.utilities import database, hashing, oauth2

from app.model import db_models
from app.model.schema.users import ShowUser, User, CreateNewUser

router = APIRouter(prefix="/user", tags={"Users"})


# CREATING A USER
@router.post("")
def create_user(request: CreateNewUser, db: Session = Depends(database.get_db)):
    if request.username.isdigit():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"INVALID INPUTS",
        )
    new_user = db_models.User(
        username=request.username,
        password=hashing.Hash.bcrpyt(request.password),
        email=request.email,
    )
    # new_likes_list = db_models.Likes_list(
    #     user_id = new_user.id
    # )
    create_users_log(f'User {request.username} has been created')
    db.add(new_user)
    # db.add(new_likes_list)
    db.commit()
    db.refresh(new_user)
    return new_user


# SHOW THE USER
@router.get("/{id}", response_model=ShowUser)
def get_user(id: int, db: Session = Depends(database.get_db)):
    user = db.query(db_models.User).filter(db_models.User.id == id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {id} not found"
        )
    create_users_log(f'User {user.username} details has been accessed')
    return user
