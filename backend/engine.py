import json
import random
import time
import uuid

import pandas as pd

import utils


def generate_random_values():
    MEAN_TEMPERATURE = 21.946215
    STD_TEMPERATURE = 2.912892
    MEAN_HUMIDITY = 91.998741
    STD_HUMIDITY = 2.953022

    return [
        {
            "temperature": random.gauss(MEAN_TEMPERATURE, STD_TEMPERATURE),
            "humidity": random.gauss(MEAN_HUMIDITY, STD_HUMIDITY),
            "roomArea": f"roomArea{room_area}",
            "id": str(uuid.uuid4()),
            "timestamp": int(time.time() * 1000),  # in milliseconds
        }
        for room_area in range(1, 4)
    ]


def aggregate_values(json_file: str) -> dict:
    values = json.load(open(json_file, "r"))
    df = pd.json_normalize(values, "array")

    columns = ["temperature", "humidity"]
    agg_features = ["min", "max", "median", "mean"]
    df_agg = df.groupby("roomArea")[columns].agg(agg_features)

    return utils.df_to_nested_dict(df_agg)
