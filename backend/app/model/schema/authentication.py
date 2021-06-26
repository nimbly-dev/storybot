from typing import List, Optional
from pydantic import BaseModel, fields

# Schema for tokendata
class TokenData(BaseModel):
    username: Optional[str] = None
