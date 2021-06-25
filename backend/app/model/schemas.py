from typing import List, Optional
from pydantic import BaseModel, fields


# Schema for User obj
class User(BaseModel):
    username: str
    password: str
    email: str


# Schema for tokendata
class TokenData(BaseModel):
    username: Optional[str] = None


# Schema for base backgroundstorybase
class BackgroundStoryBase(BaseModel):
    id: int
    title: str
    body: str
    character_name: str
    is_shared: bool


# Schema for background story
class BackgroundStory(BackgroundStoryBase):
    class Config:
        orm_mode = True


# Schema for showing the created User
class ShowUser(BaseModel):
    username: str
    saved_background_stories: List[BackgroundStory] = []
    # generated_bg_stories (Todo)

    class Config:
        orm_mode = True


# Schema for showing all background story of user
class ShowAllBackgroundStoryUser(BaseModel):
    user_id: int
    saved_background_stories: List[BackgroundStory] = []
    # generated_bg_stories (Todo)

    class Config:
        orm_mode = True


# Schema for showing specific background story by id
class ShowBackgroundStory(BaseModel):
    title: str
    body: str
    character_name: str
    is_shared: bool

    class Config:
        orm_mode = True


# Schema for showing all shared background story
# class ShowSharedBackgroundStory(BaseModel):
#     shared_background_stories: List[BackgroundStory.is_shared == True] = []

#     class Config:
#         orm_mode = True
