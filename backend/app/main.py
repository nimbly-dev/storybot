import logging

from logging.config import dictConfig
from my_logging import log_config

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.routers import users, background_stories, authentication, random_gen
from app.model import db_models
from app.utilities.database import engine

dictConfig(log_config)

app = FastAPI(debug=True)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(authentication.router)
app.include_router(users.router)
app.include_router(background_stories.router)
app.include_router(random_gen.router)


db_models.Base.metadata.create_all(bind=engine)
