import React, { useState } from 'react';
import Navbar from "../Navbar";
import {Condition} from "../Models/Condition"
import { OfferedGradeCondition } from '../Models/OfferedGradeCondition';
import { OfferedGradeConditionWrapper } from '../Models/OfferedGradeConditionWrapper';
import {FaQuestion, FaRegTimesCircle} from 'react-icons/fa';
import './style.scss';
import {API} from '../API';
import { GradeCondition } from '../Models/GradeCondition';
{/*FaRegTimesCircle*/}
interface Props {
  email: string;
}

type IconId = string;

function CreateOfferedGradeCondition({ email }: Props) {
  const [subjectIdentifier, setSubjectIdentifier] = useState<string>('');
  const [jsonString, setJsonString] = useState('');
  const [isHovered, setIsHovered] = useState<Record<string, boolean>>({});
  const handleMouseEnter = (iconId: IconId) => {
    setIsHovered((prevIsHovered) => ({
      ...prevIsHovered,
      [iconId]: true,
    }));
  };
  
  const handleMouseLeave = (iconId: IconId) => {
    setIsHovered((prevIsHovered) => ({
      ...prevIsHovered,
      [iconId]: false,
    }));
  };
  let [gradeConditions, setOfferedGradeCondition] = useState<OfferedGradeCondition>({
    Type: 'complex', // Provide an initial Type
    Conditions: [], // Initialize an empty array for conditions
  });
  let [offeredGradeConditionWrapper, setOfferedGradeWrapper] = useState<OfferedGradeConditionWrapper>({
    GradeCondition: gradeConditions// Initialize an empty array for conditions
  });
  const [selectedType, setSelectedType] = useState('multipleAssigment');
  const [condition, setCondition] = useState<GradeCondition>({
    Type: selectedType,
      NumberOfAssigments: 0,
        RequiredNumberOfAssigments: 0,
        RequiredAvgAssigmentPercentage: 0,
        RequiredIndividualAssigmentPercentage: 0,
        RequiredIndividualBigTestPercentage: 0,
        RequiredAvgBigTestPercentage: 0,
        RequiredAvgSmallTestPercentage:0,
        RequiredIndividualSmallTestPercentage: 0,
        NumberOfBigTests: 0,
        RequiredNumberOfBigTests: 0,
        NumberOfSmallTests: 0,
        RequiredNumberOfSmallTests: 0,     
  });
  const handleRemove = (index: number)=>{
    const updatedConditions = [...gradeConditions.Conditions];
  updatedConditions.splice(index, 1);
  setOfferedGradeCondition({ ...gradeConditions, Conditions: updatedConditions });
  }

  const toggleFields = (type: string) => {
    setSelectedType(type);
    setCondition({
      Type: selectedType,
      NumberOfAssigments: 0,
        RequiredNumberOfAssigments: 0,
        RequiredAvgAssigmentPercentage: 0,
        RequiredIndividualAssigmentPercentage: 0,
        RequiredIndividualBigTestPercentage: 0,
        RequiredAvgBigTestPercentage: 0,
        RequiredAvgSmallTestPercentage:0,
        RequiredIndividualSmallTestPercentage: 0,
        NumberOfBigTests: 0,
        RequiredNumberOfBigTests: 0,
        NumberOfSmallTests: 0,
        RequiredNumberOfSmallTests: 0,     
    });
  };
  
const handleFieldChange = (fieldName: string, value: any) => {
    setCondition((prevCondition) => ({
      ...prevCondition,
      [fieldName]: value,
    }));
  };

 

  const addCondition = () => {
    condition.Type = selectedType;
    // Add the condition to your state or perform further processing

    
    const newCondition = { ...condition };
    gradeConditions.Conditions.push(newCondition)
    // Update the conditions by adding the new condition to the existing list
    
    
    // Reset the form or set the default condition
    setCondition({
      Type: selectedType,
      NumberOfAssigments: 0,
        RequiredNumberOfAssigments: 0,
        RequiredAvgAssigmentPercentage: 0,
        RequiredIndividualAssigmentPercentage: 0,
        RequiredIndividualBigTestPercentage: 0,
        RequiredAvgBigTestPercentage: 0,
        RequiredAvgSmallTestPercentage:0,
        RequiredIndividualSmallTestPercentage: 0,
        NumberOfBigTests: 0,
        RequiredNumberOfBigTests: 0,
        NumberOfSmallTests: 0,
        RequiredNumberOfSmallTests: 0,     
    });
    {/*console.log(JSON.stringify(signatureConditions, (key, value) => {
      if (value !== 0) return value
    }))*/}
    setJsonString(JSON.stringify(gradeConditions, (key, value) => {
      if (value !== 0) return value
    }));
  };
  const generateJSON  = () => {
    // Assuming signatureConditions is an array or object that you've defined earlier
    offeredGradeConditionWrapper.GradeCondition = gradeConditions;
    console.log(offeredGradeConditionWrapper);
  
    // Log the JSON string to the console before any modifications
 
  
    if (subjectIdentifier !== '') {
      const jsonString = JSON.stringify(offeredGradeConditionWrapper, (key, value) => {
        // Check if the value is a numeric string
        if (typeof value === 'string' && !isNaN(parseFloat(value))) {
          return parseFloat(value); // Parse the numeric string to float
        }
        if(value!==0)
        return value; // Default behavior for other types
      });
    
      // Use the jsonString as needed (e.g., pass it to your API)
        API.addOfferedGradeCondition(subjectIdentifier, jsonString);
      
      offeredGradeConditionWrapper.GradeCondition.Conditions= [];
      gradeConditions.Conditions = [];
      setCondition({
        Type: selectedType,
      NumberOfAssigments: 0,
        RequiredNumberOfAssigments: 0,
        RequiredAvgAssigmentPercentage: 0,
        RequiredIndividualAssigmentPercentage: 0,
        RequiredIndividualBigTestPercentage: 0,
        RequiredAvgBigTestPercentage: 0,
        RequiredAvgSmallTestPercentage:0,
        RequiredIndividualSmallTestPercentage: 0,
        NumberOfBigTests: 0,
        RequiredNumberOfBigTests: 0,
        NumberOfSmallTests: 0,
        RequiredNumberOfSmallTests: 0,     
      });
    }else{
      alert('Adja meg a tárgykódot!');
    }
    
  }

  return (
    <>
      <Navbar email={email}  />
      <h1 className='cards__header__text'>Megajánlott jegy feltétel létrehozása</h1>
        
            <li className='cards__item'>
        <div className='cards__container'>
         <div className='cards__item__link'>
          <div className='cards__item__info'>
          <div>
          <h4 className='headers'>Számonkérés típusa: </h4>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => toggleFields(e.target.value as string)}
          >
            <option value="multipleAssigment">Beadandó</option>
            <option value="bigTests">NagyZH</option>
            <option value="smallTests">KisZH</option>
            <option value="offeredGrade">Megajánlot jegykialakítás</option>
          </select>
        </div>
        {selectedType === 'multipleAssigment' && (
          <div id="numberOfAssigmentsContainer">
            <h4 className='headers'>Beadandók száma: </h4>
            <input
              type="number"
              min="0"
              value={condition.NumberOfAssigments || ''}
              onChange={(e) => handleFieldChange('NumberOfAssigments', e.target.value)}
              name="numberOfAssigments"
            />
            <h4 className='headers'>Kötelezően megírandó beadandók száma: </h4>
            <input
              type="number"
              value={condition.RequiredNumberOfAssigments || ''}
              max={condition.NumberOfAssigments || ''}
              min="0"
              onChange={(e) => handleFieldChange('RequiredNumberOfAssigments', e.target.value)}
              name="RequiredNumberOfAssigments"
            />
            <h4 className='headers'>Szükséges eredmény beadandókként: </h4>
            <input
              type="number"
              min="0"
              max="100"
              value={condition.RequiredIndividualAssigmentPercentage || ''}
              onChange={(e) => handleFieldChange('RequiredIndividualAssigmentPercentage', e.target.value)}
              name="RequiredIndividualAssigmentPercentage"
            /><span className="icon-container" onMouseEnter={() => handleMouseEnter('RequiredIndividualAssigmentPercentage')} onMouseLeave={() => handleMouseLeave('RequiredIndividualAssigmentPercentage')}>
            <span className='icon'><FaQuestion/></span>
            {isHovered['RequiredIndividualAssigmentPercentage'] && <span className='text'>Az a százalékos eredmény, amelyet minden beadandón el kell érni.</span>}
          </span>
            <h4 className='headers'>Szükséges átlagos eredmény: </h4>
            <input
              type="number"
              min="0"
              max="100"
              value={condition.RequiredAvgAssigmentPercentage || ''}
              onChange={(e) => handleFieldChange('RequiredAvgAssigmentPercentage', e.target.value)}
              name="RequiredAvgAssigmentPercentage"
            /><span className="icon-container" onMouseEnter={() => handleMouseEnter('RequiredAvgAssigmentPercentage')} onMouseLeave={() => handleMouseLeave('RequiredAvgAssigmentPercentage')}>
            <span className='icon'><FaQuestion/></span>
            {isHovered['RequiredAvgAssigmentPercentage'] && <span className='text'>Az a százalékos eredmény amit az összesen megírt beadandók átlagaként kell elérni.</span>}
          </span>
          </div>
        )}
        {selectedType === 'bigTests' && (
          <div id="numberOfBigTestsContainer">
            <h4 className='headers'>NagyZH-k száma:</h4>
            <input
              type="number"
              min="0"
              value={condition.NumberOfBigTests || ''}
              onChange={(e) => handleFieldChange('NumberOfBigTests', e.target.value)}
              name="numberOfBigTests"
            />
            <h4 className='headers'>Kötelezően megírandó nagyZH-k száma:</h4>
            <input
              type="number"
              min="0"
              max={condition.NumberOfBigTests || ''}
              value={condition.RequiredNumberOfBigTests || ''}
              onChange={(e) => handleFieldChange('RequiredNumberOfBigTests', e.target.value)}
              name="requiredNumberOfBigTests"
            />
            <h4 className='headers'>Szükséges eredmény nagyZH-nként: </h4>
            <input
              type="number"
              min="0"
              max="100"
              value={condition.RequiredIndividualBigTestPercentage || ''}
              onChange={(e) => handleFieldChange('RequiredIndividualBigTestPercentage', e.target.value)}
              name="RequiredIndividualBigTestPercentage"
            />
            <h4 className='headers'>Szükséges átlagos eredmény: </h4>
            <input
              type="number"
              min="0"
              max="100"
              value={condition.RequiredAvgBigTestPercentage || ''}
              onChange={(e) => handleFieldChange('RequiredAvgBigTestPercentage', e.target.value)}
              name="RequiredAvgBigTestPercentage"
            />
          </div>
        )}
        {selectedType === 'smallTests' && (
          <div id="numberOfSmallTestsContainer">
            <h4 className='headers'>KisZH-k száma: </h4>
            <input
              type="number"
              min="0"
              value={condition.NumberOfSmallTests || ''}
              onChange={(e) => handleFieldChange('NumberOfSmallTests', e.target.value)}
              name="numberOfSmallTests"
            />
            <h4 className='headers'>Kötelezően megírandó kisZH-k száma: </h4>
            <input
              type="number"
              max={condition.NumberOfSmallTests || ''}
              min="0"
              value={condition.RequiredNumberOfSmallTests || ''}
              onChange={(e) => handleFieldChange('RequiredNumberOfSmallTests', e.target.value)}
              name="requirednumberOfSmallTests"
            />
            <h4 className='headers'>Szükséges eredmény kisZH-nként: </h4>
            <input
              min="0"
              max="100"
              type="number"
              value={condition.RequiredIndividualSmallTestPercentage || ''}
              onChange={(e) => handleFieldChange('RequiredIndividualSmallTestPercentage', e.target.value)}
              name="RequiredIndividualSmallTestPercentage"
            />
            <h4 className='headers'>Szükséges átlagos eredmény: </h4>
            <input
              min="0"
              max="100"
              type="number"
              value={condition.RequiredAvgSmallTestPercentage || ''}
              onChange={(e) => handleFieldChange('RequiredAvgSmallTestPercentage', e.target.value)}
              name="RequiredAvgSmallTestPercentage"
            />         
          </div>
          
        )}
        {selectedType === 'offeredGrade' && (
          <div id="gradingContainer">
            <h4 className='headers'>Jeles eredmény alsó határa (százalékban): </h4>
            <input
              min="0"
              max="100"
              type="number"
              value={condition.OfferedGradeAPercentage || ''}
              onChange={(e) => handleFieldChange('OfferedGradeAPercentage', e.target.value)}
              name="OfferedGradeAPercentage"
            />
            <h4 className='headers'>Jó eredmény alsó határa (százalékban): </h4>
            <input
              min="0"
              max={condition.OfferedGradeAPercentage || ''}
              type="number"
              value={condition.OfferedGradeBPercentage || ''}
              onChange={(e) => handleFieldChange('OfferedGradeBPercentage', e.target.value)}
              name="OfferedOfferedGradeBPercentage"
            />
            <h4 className='headers'>Közepes eredmény alsó határa (százalékban): </h4>
            <input
            min="0"
            max={condition.OfferedGradeBPercentage || ''}
              type="number"
              value={condition.OfferedGradeCPercentage || ''}
              onChange={(e) => handleFieldChange('OfferedGradeCPercentage', e.target.value)}
              name="OfferedGradeCPercentage"
            />
            <h4 className='headers'>Elégséges eredmény alsó határa (százalékban): </h4>
            <input
            min="0"
            max={condition.OfferedGradeCPercentage || ''}
              type="number"
              value={condition.OfferedGradeDPercentage || ''}
              onChange={(e) => handleFieldChange('OfferedGradeDPercentage', e.target.value)}
              name="OfferedGradeDPercentage"
            />
          </div>
        )}       
         
        <button onClick={addCondition} type="button">Feltétel hozzáadása</button><br/>
        
        
          </div>
         </div>
        </div>
      </li>
      <br></br><br></br>
      <>
            <li className='cards__item'>
              <div className='cards__container'>
                <div className='cards__item__link'>
                  <div className='cards__item__info'>
                    <h2 className='cards__email__text'>Eddigi megadott feltételek:</h2>
                    <ul>
              {gradeConditions.Conditions.map((condition: GradeCondition, index: number) => (
                <li key={index} className='condition'>
                  
                  {condition.Type === "multipleAssigment" && (
                <>
                Feltétel: Beadandó <FaRegTimesCircle
  className='icon'
  color='red'
  onClick={() => handleRemove(index)}
/>
                  <div>
                    {condition.NumberOfAssigments &&(
                      <>
                      Beadandók száma: {condition.NumberOfAssigments}<br />
                      </>
                    )}
                    {condition.RequiredNumberOfAssigments &&(
                      <>
                      Kötelezően megírandó beadandók száma: {condition.RequiredNumberOfAssigments}<br />
                      </>
                    )}
                    
                    {condition.RequiredAvgAssigmentPercentage && (
                      <>
                      Szükséges eredmény beadandókként: {condition.RequiredIndividualAssigmentPercentage}%<br />
                      </>
                    )}
                    
                    {condition.RequiredAvgAssigmentPercentage && (
                      <>
                        Szükséges átlagos eredmény: {condition.RequiredAvgAssigmentPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    
                  </div>
                </>
              )}
                  {condition.Type === "bigTests" && (
                    
                    <>
                    Feltétel: NagyZH<FaRegTimesCircle
  className='icon'
  color='red'
  onClick={() => handleRemove(index)}
/>
                      <div>
                      
                      {condition.NumberOfBigTests && (
                      <>
                        NagyZH-k száma: {condition.NumberOfBigTests}<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                      {condition.RequiredIndividualBigTestPercentage && (
                      <>
                        Szükséges eredmény nagyZH-nként: {condition.RequiredIndividualBigTestPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    {condition.RequiredAvgBigTestPercentage && (
                      <>
                        Szükséges átlagos eredmény: {condition.RequiredAvgBigTestPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    
                      </div>
                    </>
                    
                  )}
                  {condition.Type === "smallTests" && (
                    
                    <>
                    Feltétel: KisZH<FaRegTimesCircle
  className='icon'
  color='red'
  onClick={() => handleRemove(index)}
/>
                      <div>
                      
                      {condition.NumberOfSmallTests && (
                      <>
                        KisZH-k száma: {condition.NumberOfSmallTests}<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    {condition.RequiredNumberOfSmallTests && (
                      <>
                        Minimum megírandó KisZH-k száma: {condition.RequiredNumberOfSmallTests}<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                      {condition.RequiredIndividualSmallTestPercentage && (
                      <>
                        Szükséges eredmény kisZH-nként: {condition.RequiredIndividualSmallTestPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    {condition.RequiredAvgSmallTestPercentage && (
                      <>
                        Szükséges átlagos eredmény : {condition.RequiredAvgSmallTestPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    
                      </div>
                    </>
                    
                  )}
                  {condition.Type === "offeredGrade" && (
                    
                    <>
                    Megajánlot jegykialakítás:<FaRegTimesCircle
  className='icon'
  color='red'
  onClick={() => handleRemove(index)}
/>
                      <div>
                      
                      {condition.OfferedGradeAPercentage && (
                      <>
                        Jeles eredmény alsó határa: {condition.OfferedGradeAPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                      {condition.OfferedGradeBPercentage && (
                      <>
                        Jó eredmény alsó határa: {condition.OfferedGradeBPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    {condition.OfferedGradeCPercentage && (
                      <>
                        Közepes eredmény alsó határa: {condition.OfferedGradeCPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    {condition.OfferedGradeDPercentage && (
                      <>
                        Elégséges eredmény alsó határa: {condition.OfferedGradeDPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                      </div>
                    </>
                    
                  )}
                </li>
                
              ))}
            </ul>
            <h4 className='headers'>Tárgykód:</h4>
            <input
  name='SubjectCode'
  value={subjectIdentifier}
  onChange={(e) => setSubjectIdentifier(e.target.value)}
></input><span className="icon-container" onMouseEnter={() => handleMouseEnter('subjectCode')} onMouseLeave={() => handleMouseLeave('subjectCode')}>
          <span className='icon'><FaQuestion/></span>
          {isHovered['subjectCode'] && <span className='text'>Ha a tárgykód tartalmazza a dátumot, akkor azt is megkell adni. PL: NKMKVI3244I/2023/24/1</span>}
        </span><br></br>
      <button id="generateJSON" onClick={generateJSON}>Megajánlott jegy feltétel létrehozása</button>
                  </div>
                </div>
              </div>
            </li>
          </>

    </>
    
  );
}

export default CreateOfferedGradeCondition;