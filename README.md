# Sensors Aggregation Simulation

## How to run

Clone this repository

```
git clone https://github.com/salehzaidan/sensors-aggregation-simulation
```

### Backend

Create a new virtual environment and activate it

```sh
python -m venv .venv
source .venv/Scripts/activate
```

Install the required dependencies from `requirements.txt`

```sh
pip install -r requirements.txt
```

Run the server (default to port 8000)

> If port is different then set it manually inside `.env` under the `VITE_SENSOR_DATA_API_URL` field)

```sh
cd backend
uvicorn main:app
# uvicorn main:app --port PORT
```

### Frontend

Install the required dependencies

```sh
npm install
```

Run the development server

```sh
npm run start
```
