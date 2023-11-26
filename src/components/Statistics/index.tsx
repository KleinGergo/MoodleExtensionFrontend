import React, { useState } from 'react';
import Navbar from '../Navbar';
import Cards from '../Cards';
import { API } from '../API';
import { FrontendStatistics } from '../Models/FrontendStatistics';
import { FrontendChartData } from '../Models/FrontendChartData';


function Statistic({ email }: { email: string })  {
  const [courseIdentifier, setCourseIdentifier] = useState('');
  const [chartData, setChartData] = useState<FrontendStatistics| undefined>();



  const getStatisticForSubject = async (courseIdentifier: string) => {
    try {
      const data = await API.getStatisticForCourse(courseIdentifier);
      if (data) {
        let parsedData: FrontendStatistics = JSON.parse(JSON.stringify(data));
        
        setChartData(parsedData);
      } else {
        console.error('Parsed data is undefined or falsy.');
      }
    } catch (error) {
      console.error('Error parsing or setting chart data:', error);
    }
  };
  

  return (
    
    <>
      <Navbar email={email || ''} />
      
      <div className='cards'>
        
        <div className='cards__container'>
        <h2 className='cards__email__text'>Adja meg a tárgykódot:</h2>
        <br />
      <input
        type='text'
        value={courseIdentifier}
        onChange={(e) => setCourseIdentifier(e.target.value)}
      />
      <button onClick={() => getStatisticForSubject(courseIdentifier)}>Teszteredmények lekérése</button>
          <div className='cards__wrapper'>
            <ul className='cards__item'>
              <Cards reactData={chartData}/>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export  default Statistic;

