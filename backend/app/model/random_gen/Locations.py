import json
import random

json_path = open("app/data/data.json")

data_dict = json.load(json_path)

# Human locations generation variables
HUMAN_LOCATION_PREFIX = random.choice(
    data_dict["data"]["human"]["locations"]["location_word_prefix"]
).capitalize()
HUMAN_LOCATION_SUFFIX = random.choice(
    data_dict["data"]["human"]["locations"]["location_word_suffix"]
)

# Elf locations generation variables
ELF_LOCATION_PREFIX = random.choice(
    data_dict["data"]["elf"]["locations"]["location_word_prefix"]
).capitalize()
ELF_LOCATION_MIDDLE = random.choice(
    data_dict["data"]["elf"]["locations"]["location_word_middle"]
)
ELF_LOCATION_SUFFIX = random.choice(
    data_dict["data"]["elf"]["locations"]["location_word_suffix"]
)

# Dwarf locations generation variables
DWARF_LOCATION_PREFIX = random.choice(
    data_dict["data"]["dwarf"]["locations"]["location_word_prefix"]
).capitalize()
DWARF_LOCATION_MIDDLE = random.choice(
    data_dict["data"]["dwarf"]["locations"]["location_word_middle"]
)
DWARF_LOCATION_SUFFIX = random.choice(
    data_dict["data"]["dwarf"]["locations"]["location_word_suffix"]
)

# Orc locations generation variables
ORC_LOCATION_FIRSTIX = random.choice(
    data_dict["data"]["orc"]["locations"]["location_word_firstix"]
).capitalize()
ORC_LOCATION_SECONDIX = random.choice(
    data_dict["data"]["orc"]["locations"]["location_word_secondtix"]
)
ORC_LOCATION_THIRDIX = random.choice(
    data_dict["data"]["orc"]["locations"]["location_word_thirdtix"]
)
ORC_LOCATION_FOURTHIX = random.choice(
    data_dict["data"]["orc"]["locations"]["location_word_fourthix"]
)

# Location name builders below here


def generate_human_location():
    return f"{HUMAN_LOCATION_PREFIX}{HUMAN_LOCATION_SUFFIX}"


def generate_elf_location():
    return f"{ELF_LOCATION_PREFIX}{ELF_LOCATION_MIDDLE}{ELF_LOCATION_SUFFIX}"


def generate_dwarf_location():
    return f"{DWARF_LOCATION_PREFIX}{DWARF_LOCATION_MIDDLE}{DWARF_LOCATION_SUFFIX}"


def generate_orc_location():
    return f"{ORC_LOCATION_FIRSTIX}{ORC_LOCATION_SECONDIX}{ORC_LOCATION_THIRDIX}{ORC_LOCATION_FOURTHIX}"
