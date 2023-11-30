import CryptoJS from 'crypto-js';

const API_BASE_URL = 'https://localhost:52404/api';

const API = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/User/login?email=${email}&password=${CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)}`,
      {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  },
  // Add more API functions here as needed
  addOfferedGradeCondition: async(subjectIdentifier: string, signatureCondition: string) =>{
    try{
      const response = await fetch(
        `${API_BASE_URL}/MoodleApi/addOfferedGradeCondition?subjectIdentifier=${subjectIdentifier}&signatureCondition=${signatureCondition}`,
        {
          method: 'PUT'
        });
      if (!response.ok){
        throw new Error('API request failed');
      }

    }catch(error){
      console.error('Error in addOfferedGradeCondition:',error);
      throw error;
    }
  },
  addSignatureCondition: async(subjectIdentifier: string, signatureCondition: string) =>{
    try{
      const response = await fetch(
        `${API_BASE_URL}/MoodleApi/AddSignatureCondition?subjectIdentifier=${subjectIdentifier}&signatureCondition=${signatureCondition}`,
        {
          method: 'PUT'
        });
      if (!response.ok){
        throw new Error('API request failed');
      }

    }catch(error){
      console.error('Error in addSignatureCondition:',error);
      throw error;
    }
  },
  
  getTestResultsForCourse: async (subjectIdentifier: string) => {
    try {
      let response = await fetch(
        `${API_BASE_URL}/MoodleApi/getTestResults?subjectIdentifier=${subjectIdentifier}`,
        {
          method: 'GET'
        });
  
      if (!response.ok) {
        throw new Error('API request failed');
      } else {
        const data = await response.json();
        return data; // Return the data
      }
    } catch (error) {
      console.error('Error in getTestResultsForCourse:', error);
      // Handle the error or log it, and return null or an appropriate value
      return null;
    }
  },

  getStatisticForCourse: async (subjectIdentifier: string)=>{
    try{
      console.log(`${API_BASE_URL}/MoodleAPI/getStatistics?subjectIdentifier=${subjectIdentifier}`);
      const response = await fetch(
        `${API_BASE_URL}/MoodleAPI/getStatistics?subjectIdentifier=${subjectIdentifier}`,
        {
          method: 'GET'
        });
  
      if (!response.ok) {
        throw new Error('API request failed');
      } else {
        const data = await response.json();
        if(data.value === "The subject does not exists!")
        {
          alert("Nem létezik kurzus a megadott tárgykóddal!");
          throw new Error('API request failed');
        }
        return data; // Return the data
      }

    }catch(error){
      console.error('Error in getStatisticForCourse:', error);
    }
  }
  
};

export { API, API_BASE_URL }; // Export them separately
