import base64
from app.utilities.token import create_access_token
from fastapi.param_functions import Depends
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

#FOR TESTING PURPOSE ONLY
''' 
    Testing Account: 
        id = 1
        username = hello
        password = password12
'''


# RANDOM GEN ENDPOINT VALIDATION TESTS
#======================================================================================================================
'''
    TEST PASSED IF:
        1. Status Code is 200
        2. response.json() is not None
'''
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

def test_gen_faction():
    response = client.post("/random-gen/generate-background-story"
    ,json={
        "race" : "Human",
        "profession" : "Tester",
        "antagonist_name" : "blurg",
        "antagonist_faction" : "blurg Kingdom"
    }
    )
    assert response.status_code == 200
    assert response.json() != None

def test_gen_faction():
    response = client.get("/random-gen/title")
    assert response.status_code == 200
    assert response.json() != None


# AUTHENTICATION ENDPOINT VALIDATION TEST
#======================================================================================================================
'''
    TEST PASSED IF:
        1. Status Code is 200
        2. response.json() is not None
'''
def test_login():
    response = client.post("/login"
    ,headers={
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    ,data={
        "username" : "hello",
        "password" : "password"
    }
    )
    
    assert response.status_code == 200
    assert response.json() != None

# USER ENDPOINT VALIDATION TEST
#======================================================================================================================
'''
    TEST PASSED IF:
        1. Status Code is 200
        2. response.json() is equal to what is sended on the endpoint or is not Empty
'''
def test_create_user():
    response = client.post("/user"
    ,json={
        "username" : "new_user",
        "password" : "password_test",
        "email" : "thisIsANewUser@newuser.com"
    })
    assert response.status_code == 200
    assert response.json()['username'] == "new_user"
    assert response.json()['email'] == "thisIsANewUser@newuser.com"

def test_get_user_by_id():
    response = client.get("/user/1")
    assert response.status_code == 200
    assert response.json()['username'] == "hello"


# BACKGROUND STORY ENDPOINT VALIDATION TEST
#======================================================================================================================
'''
    DEFAULT USER IS "Hello"

    TEST PASSED IF:
        1. Status Code is 201
        2. response.json() is equal to what is sended on the endpoint or is not Empty
'''
def test_create_background_story():
    access_token = base64.b64encode(b"hello:password").decode("utf-8")
    response = client.post("/background-story"
        ,headers={
            'Authorization' : 'Bearer '+access_token,
            'Content-type' : 'application/json'
        }
        ,json={
            "user_id" : 1,
            "title" : "Test Story",
            "body" : "Test Body",
            "character_name" : "Test character name",
            "is_shared" : True
        }
    )
    assert response.status_code == 201
    

