import React from 'react';
import './CardItem.css'

interface CardItemProps {
    path: string;
    src: string;
    text: string;
  }
  const CardItem: React.FC<CardItemProps> = (props) => {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link'>
          <figure className='cards__item__pic__wrap'>
            <img
              className='cards__item__img'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;
// Create a new card component for the chart
