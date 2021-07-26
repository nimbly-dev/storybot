from app.utilities.token import create_access_token
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_create_user():
    response = client.post(
        "/user",
        json={
            "username": "hello",
            "password": "password",
            "email": "thisIsANewUser@newuser.com",
        },
    )
    assert response.status_code == 200
    assert response.json()["username"] == "hello"
    assert response.json()["email"] == "thisIsANewUser@newuser.com"


def test_create_invalid_user():
    response = client.post(
        "/user",
        json={
            "username": 123,
            "password": 456,
            "email": "thisIsAInvalidCredentials.com",
        },
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "INVALID INPUTS"


def test_get_user_by_id():
    response = client.get("/user/1")
    assert response.status_code == 200
    assert response.json() != None


def test_get_invalid_user_by_id():
    invalid_id = 99
    response = client.get(f"/user/{invalid_id}")
    assert response.status_code == 404
    assert response.json()["detail"] == f"User with id {invalid_id} not found"
