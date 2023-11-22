import React, { PureComponent } from 'react';
import CustomTooltip from '../../CustomTooltip';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import './styles.css';
import { FrontendStatistics } from '../Models/FrontendStatistics';
import ChartCard from '../StatisticCardItem';

interface ChartConfig {
  type: string;
  width: number;
  height: number;
  barColor: string;
}

export default class StatisticChart extends React.Component<{
  chartConfig: ChartConfig;
  reactData?: FrontendStatistics;
}> {
  constructor(props: { chartConfig: ChartConfig; reactData?: FrontendStatistics }) {
    super(props);
  }

  render() {
    console.log(this.props.reactData);
    const { type, width, height, barColor } = this.props.chartConfig;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8042'];
    const RADIAN = Math.PI / 180;

    if (this.props.reactData) {
      console.log(this.props.reactData);
      return (
        <>
          <BarChart
            className="BarChart"
            width={width}
            height={height}
            data={this.props.reactData?.frontendChartData}
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
            <Bar yAxisId="left" dataKey="jegy" fill={barColor} />
          </BarChart>
        </>
      );
    } else {
      return null;
    }
  }
}
