# Sensors Aggregation Simulation

## How to run

Clone this repository

```
git clone https://github.com/salehzaidan/sensors-aggregation-simulation
```

### Backend

Create a new virtual environment and activate it

```
python -m venv .venv
source .venv/Scripts/activate
```

Install the required dependencies from `requirements.txt`

```
pip install -r requirements.txt
```

Run the server (default to port 8000)

```
cd backend
uvicorn main:app
```

### Frontend

Install the required dependencies

```
npm install
```

Run the development server

```
npm run start
```
