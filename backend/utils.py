import json
import os


def store_value(file: str, value: dict):
    if os.path.isfile(file):
        if os.stat(file).st_size == 0:  # JSON file is empty
            values = {"array": []}
        else:
            values = json.load(open(file, "r"))
        values["array"].append(value)
        json.dump(values, open(file, "w"))
    else:
        json.dump({"array": [value]}, open(file, "a"))
