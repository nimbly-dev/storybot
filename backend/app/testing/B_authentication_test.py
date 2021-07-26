from starlette.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_login_with_valid_credentials():
    response = client.post(
        "/login",
        headers={
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data={"username": "hello", "password": "password"},
    )

    assert response.status_code == 200
    assert response.json() != None


def test_login_with_invalid_credentials():
    response = client.post(
        "/login",
        headers={
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data={"username": "iAmSpeed", "password": "kaChow"},
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Invalid credentials"
