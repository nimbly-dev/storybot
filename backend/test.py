import json

from app.model.random_gen import Names

f = open("app/data/data.json")

data_dict = json.load(f)

print(Names.RANDOM_MALE_HUMAN_FIRSTNAME)
