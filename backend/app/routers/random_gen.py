from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import true

from app.utilities import hashing, oauth2
from app.model.schema.users import User
from app.model.schema.random_gen import StoryGen


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
    return f'{random.choice(data_dict["data"]["human"]["names"]["lastname_first_word"]).capitalize()}{random.choice(data_dict["data"]["human"]["names"]["lastname_second_word"])}'


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
def gen_dwarf_lastname():
    return f'{random.choice(data_dict["data"]["dwarf"]["names"]["lastname_firstword"]).capitalize()}{random.choice(data_dict["data"]["dwarf"]["names"]["lastname_secondword"])}'


@router.get(
    "/orc-firstname",
    status_code=200,
    description="Generate a orc male name",
)
def gen_orc_male_name():
    return random.choice(data_dict["data"]["orc"]["names"]["male_name"])


@router.get(
    "/orc-lastname",
    status_code=200,
    description="Generate a orc female name",
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


@router.get("/class", status_code=200, description="Generate Class")
def gen_class():
    return f'{random.choice(data_dict["data"]["class"])}'


@router.get("/npc", status_code=200, description="Generate NPC")
def gen_npc():
    return f'{random.choice(data_dict["data"]["npc"])}'


@router.get("/faction", status_code=200, description="Generate Faction")
def gen_faction():
    return f'{random.choice(data_dict["data"]["factions"]["faction_firstix"]).capitalize()}{random.choice(data_dict["data"]["factions"]["faction_secondtix"])}{random.choice(data_dict["data"]["factions"]["faction_thirdtix"])}{random.choice(data_dict["data"]["factions"]["faction_fourthix"])}{random.choice(data_dict["data"]["factions"]["faction_fifthix"])} {random.choice(data_dict["data"]["factions"]["faction_type"])}'


@router.post(
    "/generate-background-story",
    status_code=200,
    description="Generate a full background story",
)
def gen_background_story(request: StoryGen):
    background_story_input = {
        "race": request.race,
        "profession": request.profession,
        "antagonist_name": request.antagonist_name,
        "antagonist_faction": request.antagonist_faction,
    }

    # Generate story lines variables
    story_gen_birth = random.choice(data_dict["data"]["story_gen"]["birth_story"])
    generated_birth_story = story_gen_birth.replace("{INSERT_RACE}", request.race)

    generated_childhood_story = random.choice(
        data_dict["data"]["story_gen"]["childhood_story"]
    )

    story_gen_training = random.choice(data_dict["data"]["story_gen"]["training_story"])
    generated_training_story = story_gen_training.replace(
        "{INSERT_CLASS_HERE}", request.profession
    )

    story_gen_antagonist = random.choice(
        data_dict["data"]["story_gen"]["antagonist_story"]
    )
    replace_antagonist_name = story_gen_antagonist.replace(
        "{INSERT_ANTAGONIST_NAME}", request.antagonist_name
    )
    replace_antagonist_faction = replace_antagonist_name.replace(
        "{INSERT_ANTAGONIST_FACTION_NAME}", request.antagonist_faction
    )

    generated_antagonist_story = replace_antagonist_faction

    gen_background_story = (
        f"{generated_birth_story} "
        f"{generated_childhood_story} "
        f"{generated_training_story} "
        f"{generated_antagonist_story} "
    )

    return gen_background_story


@router.get("/title", status_code=200, description="Generate a story-title")
def gen_story_title():
    return random.choice(data_dict["data"]["title_gen"])
