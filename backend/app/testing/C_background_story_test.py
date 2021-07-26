from app.utilities.oauth2 import get_current_user
from starlette import responses
from app.utilities.token import create_access_token
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)
access_token = create_access_token(data={"sub": "hello", "user_id": 1})
get_user = get_current_user(access_token)
"""
Test Account
    username = hello
    password = password
"""


def test_create_background_story():
    response = client.post(
        "/background-story/",
        json={
            "user_id": 1,
            "title": "Test Story",
            "body": "Test Body",
            "character_name": "Test character name",
            "is_shared": True,
        },
        headers={"Authorization": f"Bearer " + access_token},
    )
    assert response.status_code == 201
    assert response.json()["title"] == "Test Story"
    assert response.json()["body"] == "Test Body"
    assert response.json()["character_name"] == "Test character name"
    assert response.json()["is_shared"] == True


def test_get_all_background_story():
    response = client.get(
        "/background-story/", headers={"Authorization": f"Bearer " + access_token}
    )
    assert response.status_code == 200
    assert response.json() != None


def test_update_background_story_by_id():
    response = client.put(
        "/background-story/1",
        headers={"Authorization": f"Bearer " + access_token},
        json={
            "title": "Updated Title",
            "body": "Updated Body",
            "character_name": "Updated String",
            "is_shared": True,
        },
    )

    assert response.status_code == 202
    assert response.json()["Update"] == f"Background story with id 1 has been updated"


def test_get_all_shared_background_story():
    response = client.get(
        "/background-story/shared-background-stories",
        headers={"Authorization": f"Bearer " + access_token},
    )
    assert response.status_code == 200
    assert response.json() != None


def test_get_background_story_by_id():
    response = client.get(
        "/background-story/1", headers={"Authorization": f"Bearer " + access_token}
    )
    assert response.status_code == 200
    assert response.json()["creator"]["username"] == "hello"
    assert response.json()["title"] == "Updated Title"
    assert response.json()["body"] == "Updated Body"
    assert response.json()["character_name"] == "Updated String"


def test_get_background_story_by_invalid_id():
    invalid_id = 99
    response = client.get(
        f"/background-story/{invalid_id}",
        headers={"Authorization": f"Bearer " + access_token},
    )

    assert response.status_code == 404
    assert (
        response.json()["detail"]
        == f"Background story with the id {invalid_id} is not found"
    )


def test_get_background_story_by_id_with_invalid_access_token():
    invalid_access_token = "I am speed, kaChow"
    response = client.get(
        "/background-story/1",
        headers={"Authorization": f"Bearer " + invalid_access_token},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Could not validate credentials"


def test_create_background_story_with_invalid_credentials():
    invalid_access_token = "I am speed, kaChow"
    response = client.post(
        "/background-story/",
        headers={"Authorization": f"Bearer " + invalid_access_token},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Could not validate credentials"


def test_create_background_story_with_invalid_inputs():
    response = client.post(
        "/background-story/",
        json={
            "user_id": 1,
            "title": 123,
            "body": 456,
            "character_name": 789,
            "is_shared": True,
        },
        headers={"Authorization": f"Bearer " + access_token},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Input provided are not valid"


def test_update_background_story_with_invalid_inputs():
    response = client.put(
        "/background-story/1",
        json={
            "title": 123,
            "body": 456,
            "character_name": 789,
            "is_shared": True,
        },
        headers={"Authorization": f"Bearer " + access_token},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Input provided are not valid"


def test_update_background_story_with_id_not_found():
    invalid_id = 99
    response = client.put(
        f"/background-story/{invalid_id}",
        json={
            "title": "Updated Title",
            "body": "Updated Body",
            "character_name": "Updated String",
            "is_shared": True,
        },
        headers={"Authorization": f"Bearer " + access_token},
    )
    assert response.status_code == 404
    assert (
        response.json()["detail"]
        == f"Background story with id {invalid_id} is not found"
    )
