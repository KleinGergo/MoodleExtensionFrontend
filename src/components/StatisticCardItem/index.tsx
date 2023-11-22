import React from 'react';
import StatisticChart from '../StatisticChart'; // Import your StatisticChart component
import "./StatisticCardItem.scss"
import { FrontendStatistics } from '../Models/FrontendStatistics';

interface ChartItemProps {
    text: string;
    type: string;
    reactData ?:FrontendStatistics;
  }

  const ChartCard: React.FC<ChartItemProps> = (props) => {
  return (
    <li className='cards__item'>
      <div className='cards__item__link'>
        <div className='cards__item__info'>
          <h5 className='cards__item__text'>{props.text}</h5>
          <StatisticChart reactData = {props.reactData} chartConfig={{  type: props.type, width: 750, height: 450, barColor: 'rgba(43,133,245, 1)' }} />
          <br></br>   
        </div>
      </div>
    </li>
  );
}

export default ChartCard;