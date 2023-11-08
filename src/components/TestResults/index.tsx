import Navbar from "../Navbar";
import React, { useState } from 'react';
import { API } from '../API';
import { saveAs } from 'file-saver'; // Use named import for FileSaver
import * as XLSX from 'xlsx'; // Use named import for XLSX
import './style.scss'


interface DataItem {
  // Define the properties of your data object
  property1: string;
  property2: number;
  // Add more properties as needed
}

function Home({ email }: { email: string }) {
  const [courseIdentifier, setCourseIdentifier] = useState('');
  const fileType ='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToXLSX = async (data: any, filename: string) => {
      try {
        const groupedData = data.reduce((result: any, item: any) => {
          const neptuncode = item.student.neptuncode;
    
          if (!result[neptuncode]) {
            result[neptuncode] = {
              'Student': { t: 's', v: neptuncode, s: { alignment: { horizontal: 'center' } }}
            };
          }
    
          const testColumnName = `${item.type || "Nem írt"} eredmény`;
          const gradeMaxColumnName = `${item.type || "Nem írt"} Max pont`;
    
          // Check for null values and replace them with 'Nem írt'
          const testResult = item.result === null ? 'Nem írt' : item.result;
    
          result[neptuncode][testColumnName] = { t: 's', v: `${testResult}`, s: { alignment: { horizontal: 'center' } }};
    
          // Check for null values and replace them with 'Nem írt'
          const gradeMax = item.gradeMax === null ? 'Nem írt' : item.gradeMax;
    
          result[neptuncode][gradeMaxColumnName] = { t: 'n', v: gradeMax, s: { alignment: { horizontal: 'center' } }};
    
          return result;
        }, {});
    
        const transformedData = Object.values(groupedData);
    
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(transformedData);
        XLSX.utils.book_append_sheet(wb, ws, 'data');
    
        ws['!rows'] = [{ hpt: 15, hpx: 15 }];
        ws['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];
    
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    
        saveAs(new Blob([excelBuffer], { type: fileType }), filename + '.xlsx');
      } catch (error) {
        console.error(error);
      }
    };
    
    
    
    
    
    
    
    

    
  
  // Make 'email' optional with 'email?'
  async function getTestResultsForCourse(courseIdentifier: string) {
    try {
      const result = await API.getTestResultsForCourse(courseIdentifier);

      if (result !== null) {
        // Data is available, you can use it here
        console.log(result);
        exportToXLSX(result,courseIdentifier);

      } else {
        alert('Nem létezik tárgy, a megadott tárgykóddal!');
        // Handle the error or indicate that an error occurred
        console.error('API request failed');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('An unexpected error occurred:', error);
    }
  }

  return (
    <>
      <Navbar email={email || ''} />
<br></br>
      <li className='cards__item'>
        <div className='cards__container'>
         <div className='cards__item__link'>
          <figure className='cards__item__pic__wrap'>
          </figure>
          <div className='cards__item__info'>
            <h4 className='cards__email__text'>Adja meg a tárgykódot:</h4>
            <input
          type="text"
          value={courseIdentifier}
          onChange={(e) => setCourseIdentifier(e.target.value)}
        />
      <br></br>
      <button onClick={() => getTestResultsForCourse(courseIdentifier)}>Teszteredmények lekérése</button>
           
          </div>
         </div>
        </div>
      </li>

    </>
  );
}

export default Home;
