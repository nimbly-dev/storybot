from fastapi import FastAPI

from app.routers import users
from app.model import db_models
from app.utilities.database import engine

app = FastAPI()
app.include_router(users.router)

db_models.Base.metadata.create_all(bind=engine)
