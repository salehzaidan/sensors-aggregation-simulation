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
};

interface ChartProps {
  variable: 'temperature' | 'humidity';
  data: SensorValue[];
}

function Chart({ variable, data }: ChartProps) {
  return (
    <div className="Chart">
      <h2>{LABEL[variable]}</h2>
      <ResponsiveContainer aspect={4 / 3}>
        <LineChart
          data={data}
          margin={{ right: 40, bottom: 10, top: 10, left: 0 }}
        >
          <XAxis />
          <YAxis domain={['auto', 'auto']} />
          <CartesianGrid />
          <Tooltip />
          <Legend />
          <Line
            dataKey={`${variable}.min`}
            stroke={COLORS.blue}
            dot={false}
            name="Min"
            isAnimationActive={false}
          />
          <Line
            dataKey={`${variable}.max`}
            stroke={COLORS.red}
            dot={false}
            name="Max"
            isAnimationActive={false}
          />
          <Line
            dataKey={`${variable}.median`}
            stroke={COLORS.yellow}
            dot={false}
            name="Median"
            isAnimationActive={false}
          />
          <Line
            dataKey={`${variable}.mean`}
            stroke={COLORS.green}
            dot={false}
            name="Average"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
