from typing import List, Optional
from pydantic import BaseModel, fields
from sqlalchemy.sql.functions import user

from app.model.schema.background_story import BackgroundStory

# Schema for User obj
class User(BaseModel):
    id: int
    username: str
    password: str
    email: str


# Schema for showing the created User
class ShowUser(BaseModel):
    username: str
    saved_background_stories: List[BackgroundStory] = []
    # generated_bg_stories (Todo)

    class Config:
        orm_mode = True


class ShowUsername(BaseModel):
    username: str

    class Config:
        orm_mode = True


# Schema for creating new User
class CreateNewUser(BaseModel):
    username: str
    password: str
    email: str
