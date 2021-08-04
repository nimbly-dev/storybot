from datetime import datetime
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.schema import ForeignKey, Table
from sqlalchemy.sql.sqltypes import Boolean, DateTime
from app.utilities.database import Base

import datetime

# likes_list = Table('association', Base.metadata,
#     Column('id',Integer, primary_key=True, index=True),
#     Column('background_story_id', ForeignKey('background_story.id')),
#     Column('users_id', ForeignKey('users.id'))
# )


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


# User Table
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)

    saved_background_stories = relationship("BackgroundStory", back_populates="creator")

# likes_list Table
class Likes_list(Base):
    __tablename__ = "likes_list"

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    user = relationship(User, primaryjoin=user_id == User.id, backref='likes_list')
    background_story_id = Column(Integer,ForeignKey('background_story.id'), primary_key=True)
    background_story = relationship(BackgroundStory, primaryjoin=background_story_id == BackgroundStory.id, backref='likes_list') 