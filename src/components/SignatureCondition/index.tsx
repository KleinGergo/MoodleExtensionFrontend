import React, { useState } from 'react';
import Navbar from "../Navbar";
import {Condition} from "../Models/Condition"
import {SignatureCondition } from '../Models/SignatureCondition';
import {SignatureConditionWrapper } from '../Models/SignatureConditionWrapper';
import {FaQuestion, FaRegTimesCircle} from 'react-icons/fa';
import './style.scss';
import {API} from '../API';
{/*FaRegTimesCircle*/}
interface Props {
  email: string;
}

type IconId = string;

function CreateSignatureCondition({ email }: Props) {
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
  let [signatureConditions, setSignatureConditions] = useState<SignatureCondition>({
    Type: 'complex', // Provide an initial Type
    Conditions: [], // Initialize an empty array for conditions
  });
  let [signatureConditionWrapper, setSignatureConditionWrapper] = useState<SignatureConditionWrapper>({
    SignatureCondition: signatureConditions// Initialize an empty array for conditions
  });
  const [selectedType, setSelectedType] = useState('multipleAssigment');
  const [condition, setCondition] = useState<Condition>({
    Type: selectedType,
      NumberOfAssigments: 0,
        RequiredNumberOfAssigments: 0,
        RequiredAvgAssigmentPercentage: 0,
        RequiredIndividualAssigmentPercentage: 0,
        RequiredIndividualBigTestPercentage: 0,
        RequiredAvgBigTestPercentage: 0,
        RequiredAvgSmallTestPercentage:0,
        RequiredIndividualSmallTestPercentage: 0,
        Weight: 0,
        NumberOfBigTests: 0,
        RequiredNumberOfBigTests: 0,
        NumberOfSmallTests: 0,
        RequiredNumberOfSmallTests: 0,
        GradeAPercentage: 0,
        GradeBPercentage: 0,
        GradeCPercentage: 0,
        GradeDPercentage: 0,
        IsCorrectionTestCanWorseTheGrade: false,
  });
  const handleRemove = (index: number)=>{
    const updatedConditions = [...signatureConditions.Conditions];
  updatedConditions.splice(index, 1);
  setSignatureConditions({ ...signatureConditions, Conditions: updatedConditions });
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
        Weight: 0,
        NumberOfBigTests: 0,
        RequiredNumberOfBigTests: 0,
        NumberOfSmallTests: 0,
        RequiredNumberOfSmallTests: 0,
        GradeAPercentage: 0,
        GradeBPercentage: 0,
        GradeCPercentage: 0,
        GradeDPercentage: 0,
        IsCorrectionTestCanWorseTheGrade: false,
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
    signatureConditions.Conditions.push(newCondition)
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
        Weight: 0,
        NumberOfBigTests: 0,
        RequiredNumberOfBigTests: 0,
        NumberOfSmallTests: 0,
        RequiredNumberOfSmallTests: 0,
        GradeAPercentage: 0,
        GradeBPercentage: 0,
        GradeCPercentage: 0,
        GradeDPercentage: 0,
        IsCorrectionTestCanWorseTheGrade: false,
    });
    {/*console.log(JSON.stringify(signatureConditions, (key, value) => {
      if (value !== 0) return value
    }))*/}
    setJsonString(JSON.stringify(signatureConditions, (key, value) => {
      if (value!==0) return value
    }));
  };
  const generateJSON = () => {
    // Assuming signatureConditions is an array or object that you've defined earlier
    signatureConditionWrapper.SignatureCondition = signatureConditions;
  
    // Log the JSON string to the console before any modifications
    console.log(JSON.stringify(signatureConditionWrapper));
  
    if (subjectIdentifier !== '') {
      const jsonString = JSON.stringify(signatureConditionWrapper, (key, value) => {
        // Check if the value is a numeric string
        if (typeof value === 'string' && !isNaN(parseFloat(value))) {
          return parseFloat(value); // Parse the numeric string to float
        }
        if(value!==0)
        return value; // Default behavior for other types
      });

      // Use the jsonString as needed (e.g., pass it to your API)
       API.addSignatureCondition(subjectIdentifier, jsonString);
      
      signatureConditionWrapper.SignatureCondition.Conditions= [];
      signatureConditions.Conditions = [];
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
        Weight: 0,
        NumberOfBigTests: 0,
        RequiredNumberOfBigTests: 0,
        NumberOfSmallTests: 0,
        RequiredNumberOfSmallTests: 0,
        GradeAPercentage: 0,
        GradeBPercentage: 0,
        GradeCPercentage: 0,
        GradeDPercentage: 0,
        IsCorrectionTestCanWorseTheGrade: false,
      });
    }else{
      alert('Adja meg a tárgykódot!');
    }
    
  }

  return (
    <>
      <Navbar email={email}  />
      <h1 className='cards__header__text'>Aláírás feltétel létrehozása</h1>
        
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
            <option value="grading">Jegykialakítás</option>
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
            <h4 className='headers'>Eredmény súlya: </h4>
          <input
            type="number"
            value={condition.Weight || ''}
            min='0'
            max='100'
            onChange={(e) => handleFieldChange('Weight', e.target.value)}
            name="weight"
          /><span className="icon-container" onMouseEnter={() => handleMouseEnter('weight')} onMouseLeave={() => handleMouseLeave('weight')}>
          <span className='icon'><FaQuestion/></span>
          {isHovered['weight'] && <span className='text'>Az eredmény hány százalékban számít bele a jegykialakításba.</span>}
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
            <h4 className='headers'>Eredmény súlya: </h4>
          <input
            type="number"
            min="0"
            max="100"
            value={condition.Weight || ''}
            onChange={(e) => handleFieldChange('Weight', e.target.value)}
            name="weight"
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
          <h4 className='headers'>Eredmény súlya: </h4>
          <input
            min="0"
            max="100"
            type="number"
            value={condition.Weight || ''}
            onChange={(e) => handleFieldChange('Weight', e.target.value)}
            name="weight"
          />
          </div>
          
        )}
        {selectedType === 'grading' && (
          <div id="gradingContainer">
            <h4 className='headers'>Jeles eredmény alsó határa (százalékban): </h4>
            <input
              min="0"
              max="100"
              type="number"
              value={condition.GradeAPercentage || ''}
              onChange={(e) => handleFieldChange('GradeAPercentage', e.target.value)}
              name="GradeAPercentage"
            />
            <h4 className='headers'>Jó eredmény alsó határa (százalékban): </h4>
            <input
              min="0"
              max={condition.GradeAPercentage || ''}
              type="number"
              value={condition.GradeBPercentage || ''}
              onChange={(e) => handleFieldChange('GradeBPercentage', e.target.value)}
              name="GradeBPercentage"
            />
            <h4 className='headers'>Közepes eredmény alsó határa (százalékban): </h4>
            <input
            min="0"
            max={condition.GradeBPercentage || ''}
              type="number"
              value={condition.GradeCPercentage || ''}
              onChange={(e) => handleFieldChange('GradeCPercentage', e.target.value)}
              name="GradeCPercentage"
            />
            <h4 className='headers'>Elégséges eredmény alsó határa (százalékban): </h4>
            <input
            min="0"
            max={condition.GradeCPercentage || ''}
              type="number"
              value={condition.GradeDPercentage || ''}
              onChange={(e) => handleFieldChange('GradeDPercentage', e.target.value)}
              name="GradeDPercentage"
            />
            <h4 className='headers'>Javító számonkéréssel lehet rontani?: </h4>
            <select
              value={condition.IsCorrectionTestCanWorseTheGrade ? 'true' : 'false'}
              onChange={(e) => handleFieldChange('IsCorrectionTestCanWorseTheGrade', e.target.value === 'true')}
              name="IsCorrectionTestCanWorseTheGrade"
            >
              <option value="true">Igen</option>
              <option value="false">Nem</option>
            </select>


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
              {signatureConditions.Conditions.map((condition: Condition, index: number) => (
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
                    {condition.Weight && (
                      <>
                        Eredmény súlya: {condition.Weight}% <br />
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
                    {condition.Weight && (
                      <>
                        Eredmény súlya: {condition.Weight}%<br />
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
                    {condition.Weight && (
                      <>
                        Eredmény súlya: {condition.Weight}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                      </div>
                    </>
                    
                  )}
                  {condition.Type === "grading" && (
                    
                    <>
                    Jegykialakítás<FaRegTimesCircle
  className='icon'
  color='red'
  onClick={() => handleRemove(index)}
/>
                      <div>
                      
                      {condition.GradeAPercentage && (
                      <>
                        Jeles eredmény alsó határa: {condition.GradeAPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                      {condition.GradeBPercentage && (
                      <>
                        Jó eredmény alsó határa: {condition.GradeBPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    {condition.GradeCPercentage && (
                      <>
                        Közepes eredmény alsó határa: {condition.GradeCPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    {condition.GradeDPercentage && (
                      <>
                        Elégséges eredmény alsó határa: {condition.GradeDPercentage}%<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    {condition.IsCorrectionTestCanWorseTheGrade && (
                      <>
                        Javító számonkéréssel lehet jegyet rontani.<br />
                        {/* Add more specific elements for this type */}
                      </>
                    )}
                    {!condition.IsCorrectionTestCanWorseTheGrade && (
                      <>
                        Javító számonkéréssel nem lehet jegyet rontani.<br />
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
      <button id="generateJSON" onClick={generateJSON}>Aláírás feltétel létrehozása</button>
                  </div>
                </div>
              </div>
            </li>
          </>

    </>
    
  );
}

export default CreateSignatureCondition;