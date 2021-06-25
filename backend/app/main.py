from fastapi import FastAPI

from app.routers import users, background_stories, authentication
from app.model import db_models
from app.utilities.database import engine

app = FastAPI()
app.include_router(authentication.router)
app.include_router(users.router)
app.include_router(background_stories.router)


db_models.Base.metadata.create_all(bind=engine)
