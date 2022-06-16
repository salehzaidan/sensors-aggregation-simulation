import { useState } from 'react';
import { useInterval } from './hooks/useInterval';
import { fetchSensorData, SensorData, SensorValue } from './lib';

const FETCH_INTERVAL_DELAY = 2000; // in milliseconds

function App() {
  const [sensorData, setSensorData] = useState<SensorData>({});

  const updateData = (newData: { [roomArea: string]: SensorValue }) => {
    const data: SensorData = {};
    for (const roomArea of Object.keys(newData)) {
      data[roomArea] = [...(sensorData?.[roomArea] || []), newData[roomArea]];
    }
    setSensorData(data);
  };

  useInterval(() => {
    fetchSensorData().then(updateData);
  }, FETCH_INTERVAL_DELAY);

  return (
    <div>
      <h1>Sensors Aggregation Simulation</h1>
      <pre>{JSON.stringify(sensorData, null, 2)}</pre>
    </div>
  );
}

export default App;
