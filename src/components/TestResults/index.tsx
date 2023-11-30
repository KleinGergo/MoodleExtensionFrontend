import Navbar from "../Navbar";
import  { useState } from 'react';
import { API } from '../API';
import { saveAs } from 'file-saver'; // Use named import for FileSaver
import * as XLSX from 'xlsx'; // Use named import for XLSX
import './style.scss'
import {Test} from '../Models/Test'
interface Props {
  email: string;
}



function Home({ email }: Props) {
  const [courseIdentifier, setCourseIdentifier] = useState('');
  const exportToXLSX = async (data: any, filename: string) => {
    try {
      const transformedData = data.reduce((result: any, item: any) => {
        const neptuncode = item.neptunCode;
  
        if (!result[neptuncode]) {
          result[neptuncode] = {
            'Neptunkód': { t: 's', v: neptuncode, s: { alignment: { horizontal: 'center' } }},
          };
        }
  
        item.tests.forEach((test: any, index: number) => {
          let testColumnName = test.testName;
          
  
          const gradeMaxColumnName = `${testColumnName || ""} Max pont`;
          testColumnName += " eredménye";
  
          const testResult = test.result === null ? 'Nem írt' : test.result;
  
          result[neptuncode][testColumnName] = { t: 's', v: `${testResult}`, s: { alignment: { horizontal: 'center' } }};
  
          const gradeMax = test.gradeMax === null ? '' : test.gradeMax;
  
          result[neptuncode][gradeMaxColumnName] = { t: 'n', v: gradeMax, s: { alignment: { horizontal: 'center' } }};
        });
  
        if (item.signatureStatus === 'approved') {
          result[neptuncode]['Aláírás'] = { t: 's', v: "Aláírva" };
        } else {
          result[neptuncode]['Aláírás'] = { t: 's', v: "Megtagadva"};
        }
  
        result[neptuncode]['Jegy'] = { t: 's', v: item.grade };
        result[neptuncode]['Megajánlott jegy'] = { t: 's', v: item.offeredGrade }; // Added line for offeredGrade
  
        return result;
      }, {});
  
      const transformedDataArray = Object.values(transformedData);
  
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(transformedDataArray);
      XLSX.utils.book_append_sheet(wb, ws, filename);
  
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  
      saveAs(new Blob([excelBuffer], { type: fileType }), filename + '.xlsx');
    } catch (error) {
      alert("Nem található tárgy a megadott tárgykóddal!");
      console.error(error);
    }
  };
  
  
  
    

  // Make 'email' optional with 'email?'
  async function getTestResultsForCourse(courseIdentifier: string) {
    try {
      const result = await API.getTestResultsForCourse(courseIdentifier);

      if (result !== null) {
        // Data is available, you can use it here
        console.log(JSON.stringify(result));
        exportToXLSX(result,courseIdentifier);

      } else{
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
