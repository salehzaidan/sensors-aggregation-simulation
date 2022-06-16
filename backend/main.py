from fastapi import FastAPI

import engine
import utils

JSON_FILE = "sensor_data.json"

app = FastAPI()


@app.get("/")
def read_root():
    value = engine.generate_random_value()
    utils.store_value(JSON_FILE, value)
    return engine.aggregate_values(JSON_FILE)
