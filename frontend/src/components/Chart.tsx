import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { SensorValue } from '../lib';

const COLORS = {
  blue: '#2563eb',
  red: '#dc2626',
  yellow: '#ca8a04',
  green: '#16a34a',
};

const LABEL = {
  temperature: 'Temperature',
  humidity: 'Humidity',
  min: 'Min',
  max: 'Max',
  median: 'Median',
  mean: 'Average',
};

interface ChartProps {
  variable: 'temperature' | 'humidity';
  data: SensorValue[];
}

function Chart({ variable, data }: ChartProps) {
  const latestData = data.map((data) => data[variable])[data.length - 1];

  return (
    <div className="Chart">
      <h2>{LABEL[variable]}</h2>
      <ResponsiveContainer aspect={4 / 3} height="auto">
        <LineChart
          data={data}
          margin={{ right: 40, bottom: 10, top: 10, left: 0 }}
        >
          <XAxis />
          <YAxis domain={['auto', 'auto']} />
          <CartesianGrid />
          <Tooltip />
          <Legend />
          {['min', 'max', 'median', 'mean'].map((field, i) => (
            <Line
              dataKey={`${variable}.${field}`}
              stroke={Object.values(COLORS)[i]}
              dot={false}
              // @ts-ignore
              name={LABEL[field]}
              isAnimationActive={false}
              key={i}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div className="Chart-latestDataContainer">
        {Object.entries(latestData).map(([field, value], i) => (
          <div
            className="Chart-latestDataItem"
            style={{ backgroundColor: `${Object.values(COLORS)[i]}99` }}
            key={i}
          >
            <p>{value.toFixed(1)}</p>
            {/* @ts-ignore */}
            <p>{LABEL[field]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chart;
