import './Cards.css';
import CardItem from '../CardItem';
import  StatisticCardItem  from "../StatisticCardItem";
import { FrontendStatistics } from '../Models/FrontendStatistics';

interface Props{

}


function Cards({reactData}:{reactData ?:FrontendStatistics}) {
 
if(reactData){
  return (
    <div className='cards'>
      <h1 className='cards__header__text'>Általános statisztika</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='../src/assets/test.png'
              text='Összes teszt száma:'
              path='/'
              value = {reactData.totalTests}
            />
            <CardItem
              src='../src/assets/signature.png'
              text='Aláírások száma:'
              path='/'
              value = {reactData.totalSignatures}
            />
            <CardItem
              src='../src/assets/people.png'
              text='Tárgyat teljesítő hallgatók száma:'
              path='/'
              value={reactData.totalNumberOfPassedStudents}
            />
          </ul>
          <ul>
          <StatisticCardItem reactData={reactData} text='Eredmények' type='bar' />
          </ul>
            
        </div>
      </div>
    </div>
  );
}
 
}

export default Cards;