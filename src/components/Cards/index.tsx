import './Cards.css';
import CardItem from '../CardItem';
import  StatisticCardItem  from "../StatisticCardItem";

function Cards() {
  return (
    <div className='cards'>
      <h1 className='cards__header__text'>Általános statisztika</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='../src/assets/people.png'
              text='Összes teszt száma:'
              path='/'
            />
            <CardItem
              src='../src/assets/people.png'
              text='Aláírások száma:'
              path='/'
            />
            <CardItem
              src='../src/assets/people.png'
              text='Teljesítő hallgatók száma:'
              path='/'
            />
          </ul>
          <ul>
          <StatisticCardItem text='Eredmények' type='bar' width={850} height={800}/>
            </ul>
            <br></br>
            <ul>
          <StatisticCardItem text='Százalék' type='line'width={850} height={800}/>
            </ul>
            <br></br>
            <ul>
          <StatisticCardItem text='Százalék' type='pie'width={1000} height={1000}/>
            </ul>

        </div>
      </div>
    </div>
  );
}

export default Cards;