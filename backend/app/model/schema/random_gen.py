from typing import List, Optional
from pydantic import BaseModel, fields


# Schema for base random genarator:
class RandomTextGen(BaseModel):
    random_txt: str
