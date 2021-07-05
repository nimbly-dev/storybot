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
    new_user = db_models.User(
        username=request.username,
        password=hashing.Hash.bcrpyt(request.password),
        email=request.email,
    )
    db.add(new_user)
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
    return user
