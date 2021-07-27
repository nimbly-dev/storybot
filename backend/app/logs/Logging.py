import logging
import datetime

date = datetime.datetime.now()

def create_authentication_log(mssg: str):
    logger = logging.getLogger("foo-logger")
    logger.debug(mssg)
    f = open("app/logs/authentication_log.txt", "a")
    f.write(f"{date}: {mssg}\n")

def create_background_story_log(mssg: str):
    logger = logging.getLogger("foo-logger")
    logger.debug(mssg)
    f = open("app/logs/background_story.txt", "a")
    f.write(f"{date}: {mssg}\n")

def create_random_gen_log(mssg: str):
    logger = logging.getLogger("foo-logger")
    logger.debug(mssg)
    f = open("app/logs/random_gen.txt", "a")
    f.write(f"{date}: {mssg}\n")

def create_users_log(mssg: str):
    logger = logging.getLogger("foo-logger")
    logger.debug(mssg)
    f = open("app/logs/users_log.txt", "a")
    f.write(f"{date}: {mssg}\n")
