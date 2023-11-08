import React from 'react';
import CustomTooltip from '../../CustomTooltip';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import './styles.css';

interface ChartConfig {
  type: string; // You can replace 'string' with a more specific type if needed
  width: number;
  height: number;
  barColor: string;
}

const data = [
  {
    name: 'Jeles',
    value: 30,
  },
  {
    name: 'Jó',
    value: 25,
  },
  {
    name: 'Közepes',
    value: 62,
  },
  {
    name: 'Elégséges',
    value: 26,
  },
  {
    name: 'Elégtelen',
    value: 9,
  },
];

function StatisticChart({ chartConfig }: { chartConfig: ChartConfig }) {
  const { type, width, height, barColor } = chartConfig;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#SS8042'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (type === 'bar') {
    return (
      <BarChart
        className="BarChart"
        width={width}
        height={height}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: '#CCCCCC' }} />
        <YAxis yAxisId="left" orientation="left" stroke="#CCCCCC" />
        <YAxis yAxisId="right" orientation="right" stroke="#CCCCCC" />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(82, 74, 78, 0.8)' }} />
        <Legend />
        <Bar yAxisId="left" dataKey="value" fill={barColor} />
      </BarChart>
    );
  } else if (type === 'line') {
    return (
      <LineChart
        className="LineChart"
        width={width}
        height={height}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: '#CCCCCC' }} />
        <YAxis yAxisId="left" orientation="left" stroke="#CCCCCC" />
        <YAxis yAxisId="right" orientation="right" stroke="#CCCCCC" />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(82, 74, 78, 0.8)' }} />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="value" stroke={barColor} />
      </LineChart>
    );
  } else if (type === 'pie') {
    return (
      <ResponsiveContainer width={width} height={height}>
      <PieChart >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      </ResponsiveContainer>
    );
  } else {
    return null;
  }
}

export default StatisticChart;
``
