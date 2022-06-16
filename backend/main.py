from fastapi import FastAPI

import engine

app = FastAPI()


@app.get("/")
def read_root():
    return engine.generate_random_value()
