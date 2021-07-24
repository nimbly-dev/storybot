from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


fake_random_gen = {
    "first_name" : "Jon"
}

# def test_read_main():
#     response = client.get("/")
#     assert response.status_code == 200
#     assert response.json() == {"msg": "Hello World"}

def test_male_firstname_human():
    response = client.get("/random-gen/human-male-firstname")
    assert response.status_code == 200
    assert response.json() == {"msg": "Jeoffroi"}