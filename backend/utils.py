import json
import os

import pandas as pd


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


def nest(d: dict) -> dict:
    # https://stackoverflow.com/a/50932879
    result = {}
    for key, value in d.items():
        target = result
        for k in key[:-1]:
            target = target.setdefault(k, {})
        target[key[-1]] = value
    return result


def df_to_nested_dict(df: pd.DataFrame) -> dict:
    # https://stackoverflow.com/a/50930860
    d = df.to_dict(orient="index")
    return {k: nest(v) for k, v in d.items()}
