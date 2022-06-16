import random
import time
import uuid


def generate_random_value():
    MEAN_TEMPERATURE = 21.946215
    STD_TEMPERATURE = 2.912892
    MEAN_HUMIDITY = 91.998741
    STD_HUMIDITY = 2.953022

    return {
        "temperature": random.gauss(MEAN_TEMPERATURE, STD_TEMPERATURE),
        "humidity": random.gauss(MEAN_HUMIDITY, STD_HUMIDITY),
        "roomArea": f"roomArea{random.randint(1, 3)}",
        "id": str(uuid.uuid4()),
        "timestamp": int(time.time() * 1000),  # in milliseconds
    }
