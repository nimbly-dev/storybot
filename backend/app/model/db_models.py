from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean
from app.utilities.database import Base


# User Table
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    saved_background_stories = relationship("BackgroundStory", back_populates="creator")


class BackgroundStory(Base):
    __tablename__ = "background_story"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body = Column(String)
    character_name = Column(String)
    is_shared = Column(Boolean)
    user_id = Column(Integer, ForeignKey("users.id"))

    creator = relationship("User", back_populates="saved_background_stories")
