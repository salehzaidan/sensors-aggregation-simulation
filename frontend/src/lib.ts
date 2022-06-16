export interface SensorValue {
  temperature: {
    min: number;
    max: number;
    median: number;
    mean: number;
  };
  humidity: {
    min: number;
    max: number;
    median: number;
    mean: number;
  };
}

export interface SensorData {
  [roomArea: string]: SensorValue[];
}

export async function fetchSensorData() {
  try {
    const response = await fetch(import.meta.env.VITE_SENSOR_DATA_API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
