from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import true

from app.utilities import hashing, oauth2
from app.model.schema.users import User


import random
import json

json_path = open("app/data/data.json")

data_dict = json.load(json_path)


router = APIRouter(prefix="/random-gen", tags={"Random-Genarator"})

# Generate Random Male Human Firstname
@router.get(
    "/human-male-firstname",
    status_code=200,
    description="Generates a random male human firstname",
)
async def gen_human_male_firstname():
    return random.choice(data_dict["data"]["human"]["names"]["male_name"])


# Generate Random Female Human Firstname
@router.get(
    "/human-female-firstname",
    status_code=200,
    description="Generates a random female human firstname",
)
def gen_human_female_firstname():
    return random.choice(data_dict["data"]["human"]["names"]["female_name"])


# Generate Random Female Human Firstname
@router.get(
    "/human-lastname",
    status_code=200,
    description="Generates a random human lastname",
)
def gen_human_lastname():
    return f'{random.choice(data_dict["data"]["human"]["names"]["lastname_first_word"]).capitalize()} {random.choice(data_dict["data"]["human"]["names"]["lastname_second_word"])}'


@router.get(
    "/elf-male-firstname",
    status_code=200,
    description="Generate a random elf male firstname",
)
def gen_elf_male_firstname():
    return random.choice(data_dict["data"]["elf"]["names"]["male_name"])


@router.get(
    "/elf-female-firstname",
    status_code=200,
    description="Generate a random elf female firstname",
)
def gen_elf_female_firstname():
    return random.choice(data_dict["data"]["elf"]["names"]["female_name"])


@router.get(
    "/elf-lastname", status_code=200, description="Generate a random elf lastname"
)
def gen_elf_lastname():
    return f'{random.choice(data_dict["data"]["elf"]["names"]["lastname_prefix"]).capitalize()}{random.choice(data_dict["data"]["elf"]["names"]["lastname_suffix"])}'


@router.get(
    "/elf-lastname-alternative",
    status_code=200,
    description="Generate a alternative elf lastname",
)
def gen_elf_alternative_lastname():
    return random.choice(data_dict["data"]["elf"]["names"]["lastname_whole"])


@router.get(
    "/dwarf-male-firstname",
    status_code=200,
    description="Generate a male dwarf firstname",
)
def gen_dwarf_male_firstname():
    return f'{random.choice(data_dict["data"]["dwarf"]["names"]["male_name_prefix"])}{random.choice(data_dict["data"]["dwarf"]["names"]["male_name_suffix"])}'


@router.get(
    "/dwarf-female-firstname",
    status_code=200,
    description="Generate a female dwarf firstname",
)
def gen_dwarf_female_firstname():
    return f'{random.choice(data_dict["data"]["dwarf"]["names"]["female_name_prefix"])}{random.choice(data_dict["data"]["dwarf"]["names"]["female_name_suffix"])}'


@router.get(
    "/dwarf-lastname",
    status_code=200,
    description="Generate a dwaft lastname",
)
def gen_dwarf_female_firstname():
    return f'{random.choice(data_dict["data"]["dwarf"]["names"]["lastname_firstword"]).capitalize()}{random.choice(data_dict["data"]["dwarf"]["names"]["lastname_secondword"])}'


@router.get(
    "/orc-firstname",
    status_code=200,
    description="Generate a orc firstname",
)
def gen_orc_male_name():
    return random.choice(data_dict["data"]["orc"]["names"]["male_name"])


@router.get(
    "/orc-lastname",
    status_code=200,
    description="Generate a orc lastname",
)
def gen_orc_female_name():
    return random.choice(data_dict["data"]["orc"]["names"]["female_name"])


@router.get("/human-location", status_code=200, description="Generate human locations")
def gen_human_location():
    return f'{random.choice(data_dict["data"]["human"]["locations"]["location_word_prefix"]).capitalize()}{random.choice(data_dict["data"]["human"]["locations"]["location_word_suffix"])}'


@router.get("/elf-location", status_code=200, description="Generate elf locations")
def gen_elf_location():
    return f'{random.choice(data_dict["data"]["elf"]["locations"]["location_word_prefix"]).capitalize()}{random.choice(data_dict["data"]["elf"]["locations"]["location_word_middle"])}{random.choice(data_dict["data"]["elf"]["locations"]["location_word_suffix"])}'


@router.get("/dwarf-location", status_code=200, description="Generate dwarf locations")
def gen_dwarf_location():
    return f'{random.choice(data_dict["data"]["dwarf"]["locations"]["location_word_prefix"]).capitalize()}{random.choice(data_dict["data"]["dwarf"]["locations"]["location_word_middle"])}{random.choice(data_dict["data"]["dwarf"]["locations"]["location_word_suffix"])}'


@router.get("/orc-location", status_code=200, description="Generate orc locations")
def gen_orc_location():
    return f'{random.choice(data_dict["data"]["orc"]["locations"]["location_word_firstix"]).capitalize()}{random.choice(data_dict["data"]["orc"]["locations"]["location_word_secondtix"])}{random.choice(data_dict["data"]["orc"]["locations"]["location_word_thirdtix"])}{random.choice(data_dict["data"]["orc"]["locations"]["location_word_fourthix"])}'
