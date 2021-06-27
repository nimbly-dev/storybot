from typing import List, Optional
from pydantic import BaseModel, fields

# Schema for base backgroundstorybase
class BackgroundStoryBase(BaseModel):
    user_id: int
    title: str
    body: str
    character_name: str
    is_shared: bool


# Schema for background story
class BackgroundStory(BackgroundStoryBase):
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
