from typing import List, Optional
from pydantic import BaseModel, fields


# Schema for tokendata
class TokenData(BaseModel):
    id: Optional[int] = None
    username: Optional[str] = None
