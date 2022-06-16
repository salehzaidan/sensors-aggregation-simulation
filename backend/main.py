from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import engine
import utils

JSON_FILE = "sensor_data.json"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    value = engine.generate_random_values()
    utils.store_value(JSON_FILE, value)
    return engine.aggregate_values(JSON_FILE)
