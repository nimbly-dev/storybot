from datetime import datetime
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean, DateTime
from app.utilities.database import Base

import datetime


class BackgroundStory(Base):
    __tablename__ = "background_story"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body = Column(String)
    character_name = Column(String)
    is_shared = Column(Boolean)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_date = Column(DateTime, default=datetime.datetime.now())

    creator = relationship("User", back_populates="saved_background_stories")
    # user_likers = relationship("User", back_populates="liked_stories", default=None)


# User Table
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)

    saved_background_stories = relationship("BackgroundStory", back_populates="creator")
    # liked_stories = relationship("BackgroundStory", back_populates="user_likers")
