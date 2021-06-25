import json

from app.model.random_gen import Names,Locations as gen

f = open('app/data/data.json')

data_dict = json.load(f)

print(gen.generate_dwarf_location())