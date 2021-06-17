from typing import List
from pydantic import BaseModel


# Schema for User obj
class User(BaseModel):
    username: str
    password: str


# Schema for showing the created User
class ShowUser(BaseModel):
    username: str
    password: str
    #generated_bg_stories (Todo)

    class Config():
        orm_mode = True
