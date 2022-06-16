import { useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './App.css';
import { useInterval } from './hooks/useInterval';
import { fetchSensorData, SensorData, SensorValue } from './lib';

const FETCH_INTERVAL_DELAY = 2000; // in milliseconds
const COLORS = {
  blue: '#2563eb',
  red: '#dc2626',
  yellow: '#ca8a04',
  green: '#16a34a',
};

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

      <button
        onClick={handleButtonClick}
        className={`App-button ${
          isRunning ? 'App-button_stop' : 'App-button_start'
        }`}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>

      {Object.keys(sensorData).length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="App-roomContainer">
          <div className="App-dataContainer">
            <h2>Temperature</h2>
            <ResponsiveContainer aspect={4 / 3}>
              <LineChart
                data={sensorData.roomArea1}
                margin={{ right: 40, bottom: 10, top: 10, left: 0 }}
              >
                <XAxis />
                <YAxis domain={['auto', 'auto']} />
                <CartesianGrid />
                <Tooltip />
                <Legend />
                <Line
                  dataKey="temperature.min"
                  stroke={COLORS.blue}
                  dot={false}
                  name="Min"
                  isAnimationActive={false}
                />
                <Line
                  dataKey="temperature.max"
                  stroke={COLORS.red}
                  dot={false}
                  name="Max"
                  isAnimationActive={false}
                />
                <Line
                  dataKey="temperature.median"
                  stroke={COLORS.yellow}
                  dot={false}
                  name="Median"
                  isAnimationActive={false}
                />
                <Line
                  dataKey="temperature.mean"
                  stroke={COLORS.green}
                  dot={false}
                  name="Average"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="App-dataContainer">
            <h2>Humidity</h2>
            <ResponsiveContainer aspect={4 / 3}>
              <LineChart
                data={sensorData.roomArea1}
                margin={{ right: 40, bottom: 10, top: 10, left: 0 }}
              >
                <XAxis />
                <YAxis domain={['auto', 'auto']} />
                <CartesianGrid />
                <Tooltip />
                <Legend />
                <Line
                  dataKey="humidity.min"
                  stroke={COLORS.blue}
                  dot={false}
                  name="Min"
                  isAnimationActive={false}
                />
                <Line
                  dataKey="humidity.max"
                  stroke={COLORS.red}
                  dot={false}
                  name="Max"
                  isAnimationActive={false}
                />
                <Line
                  dataKey="humidity.median"
                  stroke={COLORS.yellow}
                  dot={false}
                  name="Median"
                  isAnimationActive={false}
                />
                <Line
                  dataKey="humidity.mean"
                  stroke={COLORS.green}
                  dot={false}
                  name="Average"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
