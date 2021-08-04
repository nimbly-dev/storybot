from app.model.db_models import User
from typing import List, Optional
import typing
from pydantic import BaseModel, fields
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import user


# Schema for base backgroundstorybase
class BackgroundStoryBase(BaseModel):
    user_id: int
    title: str
    body: str
    character_name: str
    is_shared: bool


# Schema for background story
class BackgroundStory(BaseModel):
    title: str
    body: str
    character_name: str
    is_shared: bool
    # user_likers: List[User] = []

    class Config:
        orm_mode = True


# Schema for showing all background story of user
class ShowAllBackgroundStoryUser(BaseModel):
    user_id: int
    saved_background_stories: List[BackgroundStory] = []

    class Config:
        orm_mode = True


# Schema for User obj
class GetUser(BaseModel):
    username: str
    id: int

    class Config:
        orm_mode = True


# Schema for showing shared background story of users
class ShowSharedBackgroundStories(BaseModel):
    id: int
    creator: GetUser
    title: str
    body: str
    character_name: str
    is_shared: bool

    class Config:
        orm_mode = True


# Schema for showing specific background story by id
class ShowBackgroundStory(BaseModel):
    id: int
    creator: GetUser
    title: str
    body: str
    character_name: str
    is_shared: bool

    # likes_list : List[User] = []
    class Config:
        orm_mode = True
