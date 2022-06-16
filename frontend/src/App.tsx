import './App.css';
import { useState } from 'react';
import Chart from './components/Chart';
import { useInterval } from './hooks/useInterval';
import { fetchSensorData, SensorData, SensorValue } from './lib';

const FETCH_INTERVAL_DELAY = 2000; // in milliseconds

function App() {
  const [sensorData, setSensorData] = useState<SensorData>({});
  const [isRunning, setIsRunning] = useState(true);

  const updateData = (newData: { [roomArea: string]: SensorValue }) => {
    const data: SensorData = {};
    for (const roomArea of Object.keys(newData)) {
      data[roomArea] = [...(sensorData?.[roomArea] || []), newData[roomArea]];
    }
    setSensorData(data);
  };

  const handleButtonClick = () => {
    setIsRunning(!isRunning);
  };

  useInterval(
    () => {
      fetchSensorData().then(updateData);
    },
    isRunning ? FETCH_INTERVAL_DELAY : null
  );

  return (
    <div className="App">
      <h1 className="App-title">Sensors Aggregation Simulation</h1>

      {Object.keys(sensorData).length === 0 ? (
        <p className="App-loading">Loading</p>
      ) : (
        <>
          <button
            onClick={handleButtonClick}
            className={`App-button ${
              isRunning ? 'App-button_stop' : 'App-button_start'
            }`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>

          <div className="App-wrapper">
            {Object.keys(sensorData).map((roomArea) => (
              <div key={roomArea}>
                <h2>{roomArea}</h2>
                <div className="App-chartContainer">
                  <Chart variable="temperature" data={sensorData[roomArea]} />
                  <Chart variable="humidity" data={sensorData[roomArea]} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
