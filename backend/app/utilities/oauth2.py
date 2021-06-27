from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm.session import Session

from jose import JWTError, jwt

from app.utilities import token as JWT_token
from app.utilities import token, oauth2, database

from app.model.schema.users import User
from app.model.schema.authentication import TokenData


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return JWT_token.verify_token(token, credentials_exception)
