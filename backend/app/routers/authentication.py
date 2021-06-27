from fastapi import APIRouter, status, Request
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm.session import Session

from app.model import db_models

from app.model.schema.users import ShowUser, User

from app.utilities.hashing import Hash
from app.utilities import token, oauth2, database


router = APIRouter(tags={"Authentication"})


@router.post("/login")
def login(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db),
):
    user = (
        db.query(db_models.User)
        .filter(db_models.User.username == request.username)
        .first()
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid credentials"
        )
    if not Hash.verify(user.password, request.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid credentials"
        )
    access_token = token.create_access_token(
        data={"sub": user.username, "user_id": user.id}
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me")
async def read_users_me(
    current_user: User = Depends(oauth2.get_current_user),
    db: Session = Depends(database.get_db),
):
    return current_user.id
