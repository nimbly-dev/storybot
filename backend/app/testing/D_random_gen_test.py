from starlette.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_gen_male_firstname_human():
    response = client.get("/random-gen/human-male-firstname")
    assert response.status_code == 200
    assert response.json() != None

def test_gen_female_firstname_human():
    response = client.get("/random-gen/human-female-firstname")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_lastname_human():
    response = client.get("/random-gen/human-lastname")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_male_firstname_elf():
    response = client.get("/random-gen/elf-male-firstname")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_female_firstname_elf():
    response = client.get("/random-gen/elf-female-firstname")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_lastname_elf():
    response = client.get("/random-gen/elf-lastname")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_male_firstname_dwarf():
    response = client.get("/random-gen/dwarf-male-firstname")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_female_firstname_dwarf():
    response = client.get("/random-gen/dwarf-female-firstname")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_lastname_dwarf():
    response = client.get("/random-gen/dwarf-lastname")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_male_name_orc():
    response = client.get("/random-gen/orc-male-name")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_female_name_orc():
    response = client.get("/random-gen/orc-female-name")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_class():
    response = client.get("/random-gen/class")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_faction():
    response = client.get("/random-gen/faction")
    assert response.status_code == 200
    assert response.json() != None


def test_gen_background_story():
    response = client.post(
        "/random-gen/generate-background-story",
        json={
            "race": "Human",
            "profession": "Tester",
            "antagonist_name": "blurg",
            "antagonist_faction": "blurg Kingdom",
        },
    )
    assert response.status_code == 200
    assert response.json() != None


def test_gen_title():
    response = client.get("/random-gen/title")
    assert response.status_code == 200
    assert response.json() != None