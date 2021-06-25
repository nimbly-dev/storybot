import random
import json

json_path = open("app/data/data.json")

data_dict = json.load(json_path)


# Human Name Genarator variables
RANDOM_MALE_HUMAN_FIRSTNAME = random.choice(
    data_dict["data"]["human"]["names"]["male_name"]
)
RANDOM_FEMALE_HUMAN_FIRSTNAME = random.choice(
    data_dict["data"]["human"]["names"]["female_name"]
)
RANDOM_HUMAN_FIRSTWORD_LASTNAME = random.choice(
    data_dict["data"]["human"]["names"]["lastname_first_word"]
).capitalize()
RANDOM_HUMAN_LASTWORD_LASTNAME = random.choice(
    data_dict["data"]["human"]["names"]["lastname_second_word"]
)

# Elf name Generator variables
RANDOM_MALE_ELF_FIRSTNAME = random.choice(
    data_dict["data"]["elf"]["names"]["male_name"]
)
RANDOM_FEMALE_ELF_FIRSTNAME = random.choice(
    data_dict["data"]["elf"]["names"]["female_name"]
)
RANDOM_ELF_PREFIX_LASTNAME = random.choice(
    data_dict["data"]["elf"]["names"]["lastname_prefix"]
).capitalize()
RANDOM_ELF_SUFFIX_LASTNAME = random.choice(
    data_dict["data"]["elf"]["names"]["lastname_suffix"]
)
RANDOM_ELF_WHOLE_LASTNAME = random.choice(
    data_dict["data"]["elf"]["names"]["lastname_whole"]
)

# Dwarf name Generator variables
RANDOM_MALE_DWARF_FIRSTNAME_PREFIX = random.choice(
    data_dict["data"]["dwarf"]["names"]["male_name_prefix"]
)
RANDOM_MALE_DWARF_FIRSTNAME_SUFFIX = random.choice(
    data_dict["data"]["dwarf"]["names"]["male_name_suffix"]
)
RANDOM_FEMALE_DWARF_FIRSTNAME_PREFIX = random.choice(
    data_dict["data"]["dwarf"]["names"]["female_name_prefix"]
)
RANDOM_FEMALE_DWARF_FIRSTNAME_SUFFIX = random.choice(
    data_dict["data"]["dwarf"]["names"]["female_name_suffix"]
)
RANDOM_DWARF_LASTNAME_PREFIX = random.choice(
    data_dict["data"]["dwarf"]["names"]["lastname_firstword"]
).capitalize()
RANDOM_DWARF_LASTNAME_SUFFIX = random.choice(
    data_dict["data"]["dwarf"]["names"]["lastname_secondword"]
)

# Orc name Generator variables
RANDOM_MALE_ORC_NAME = random.choice(data_dict["data"]["orc"]["names"]["male_name"])
RANDOM_FEMALE_ORC_NAME = random.choice(data_dict["data"]["orc"]["names"]["female_name"])

# Below are name builders for all the races
def generate_human_male_name():
    return f"{RANDOM_MALE_HUMAN_FIRSTNAME} {RANDOM_HUMAN_FIRSTWORD_LASTNAME}{RANDOM_HUMAN_LASTWORD_LASTNAME}"


def generate_human_male_name():
    return f"{RANDOM_FEMALE_HUMAN_FIRSTNAME} {RANDOM_HUMAN_FIRSTWORD_LASTNAME}{RANDOM_HUMAN_LASTWORD_LASTNAME}"


def generate_elf_male_name():
    return f"{RANDOM_MALE_ELF_FIRSTNAME} {RANDOM_ELF_PREFIX_LASTNAME}{RANDOM_ELF_SUFFIX_LASTNAME}"


def generate_elf_female_name():
    return f"{RANDOM_FEMALE_ELF_FIRSTNAME} {RANDOM_ELF_PREFIX_LASTNAME}{RANDOM_ELF_SUFFIX_LASTNAME}"


def generate_alternative_elf_male_name():
    return f"{RANDOM_MALE_ELF_FIRSTNAME} {RANDOM_ELF_WHOLE_LASTNAME}"


def generate_alternative_elf_female_name():
    return f"{RANDOM_FEMALE_ELF_FIRSTNAME} {RANDOM_ELF_WHOLE_LASTNAME}"


def generate_dwarf_male_name():
    return f"{RANDOM_MALE_DWARF_FIRSTNAME_PREFIX}{RANDOM_MALE_DWARF_FIRSTNAME_SUFFIX} {RANDOM_DWARF_LASTNAME_PREFIX}{RANDOM_DWARF_LASTNAME_SUFFIX}"


def generate_dwarf_female_name():
    return f"{RANDOM_FEMALE_DWARF_FIRSTNAME_PREFIX}{RANDOM_FEMALE_DWARF_FIRSTNAME_SUFFIX} {RANDOM_DWARF_LASTNAME_PREFIX}{RANDOM_DWARF_LASTNAME_SUFFIX}"


def generate_orc_male_name():
    return f"{RANDOM_MALE_ORC_NAME}"


def generate_orc_female_name():
    return f"{RANDOM_FEMALE_ORC_NAME}"
