import React, { useState } from 'react';
import './style.scss'
import CryptoJS from 'crypto-js';


interface CardItemProps {
    text: string;
  }
  
  const CardItem: React.FC<CardItemProps> = (props) => {
    const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const changePassword = async(email: string, oldPassword: string, newPassword: string, confirmPassword: string) =>{
    if( newPassword!=confirmPassword){
      alert("A két jelszó nem egyezik!");
    }
    else{
      try{

        const response = await fetch(`https://localhost:52404/api/Profile/updatePassword?email=${email}&currentPassword=${CryptoJS.SHA256(oldPassword).toString(CryptoJS.enc.Hex)}&newPassword=${CryptoJS.SHA256(newPassword).toString(CryptoJS.enc.Hex)}`, {
          method: 'POST',
          
        });
        if (response.ok){
         alert("Sikeres jelszó változtatás!");   
        }
        else{
          alert("Jelszó változtatás sikertelen!")
        }
      } catch(error){
        console.error('Password change was unsuccessful');
        alert("A szerver nem válaszol!");
      }
    }
    
  }
  return (
    <>
      <li className='cards__item'>
        <div className='cards__container'>
         <div className='cards__item__link'>
          <figure className='cards__item__pic__wrap'>
          </figure>
          <div className='cards__item__info'>
            <h4 className='cards__email__text'>Email:</h4>
            <h5 className='cards__item__text'>{props.text}</h5>
            <label>Régi jelszó:</label>
            <br/>
            <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
          <br/><br/>
          <label>Új jelszó:</label>
          <br/>
          <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
          <br/><br/>
          <label>Új megerősítése:</label>
          <br/>
          <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

          <br/><br/>
          <button onClick={() => changePassword(props.text, oldPassword, newPassword, confirmPassword)}>Jelszó csere</button>
          </div>
         </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;
// Create a new card component for the chart
