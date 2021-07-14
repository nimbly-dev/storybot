import random
from typing import List, Optional
from pydantic import BaseModel, fields


# Schema for base random genarator:
class RandomTextGen(BaseModel):
    random_txt: str


# Schema for creating a full background story for the character:
class StoryGen(BaseModel):
    race: str
    profession: str  # Also known as class
    antagonist_name: str
    antagonist_faction: str
