import json
import random

from app.model.random_gen import Names

f = open("app/data/data.json")

data_dict = json.load(f)


#  TEST FUNCTION FOR story_gen birth
story_gen_birth = random.choice(data_dict["data"]["story_gen"]["birth_story"])

chosen_race = "Human"

generated_birth_story = story_gen_birth.replace("{INSERT_RACE}", chosen_race)

# print(x)

# TEST FUNCTION FOR story_gen childhood
generated_childhood_story = random.choice(
    data_dict["data"]["story_gen"]["childhood_story"]
)

# print(story_gen_childhood)

# TEST FUNCTION FOR story_gen training
story_gen_training = random.choice(data_dict["data"]["story_gen"]["training_story"])

chosen_class = "Paladin"

generated_training_story = story_gen_training.replace(
    "{INSERT_CLASS_HERE}", chosen_class
)

# print(x)

# TEST FUNCTION FOR story_gen antagonist
story_gen_antagonist = random.choice(data_dict["data"]["story_gen"]["antagonist_story"])

chosen_antagonist_name = "Arthas Menethil"
chosen_antagonist_faction = "Scourge"

replace_antagonist_name = story_gen_antagonist.replace(
    "{INSERT_ANTAGONIST_NAME}", chosen_antagonist_name
)
replace_antagonist_faction = replace_antagonist_name.replace(
    "{INSERT_ANTAGONIST_FACTION_NAME}", chosen_antagonist_faction
)

generated_antagonist_story = replace_antagonist_faction

# print(generated_antagonist_story)

# TEST FUNCTION FOR COMPLETE BACKSTORY CHARACTER

new_generated_backstory = (
    f"{generated_birth_story}\n"
    f"{generated_childhood_story}\n"
    f"{generated_training_story}\n"
    f"{generated_antagonist_story}\n"
)
print(new_generated_backstory)
