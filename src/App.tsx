import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile'
import { Routes, Route, BrowserRouter as Router, Navigate, useNavigate} from 'react-router-dom';
import Statistic from './components/Statistics';
import TestResults from './components/TestResults'
import SignatureCondition from './components/SignatureCondition';
import OfferedGrade from './components/OfferedGrade';
import {API} from './components/API';

interface Response{
  isLoginSuccessful: boolean;
  isPasswordChanged: boolean;
}
const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedIn(true);
      setEmail(storedUser);
    }
  }, []);
  const handleLogout = () => {
    // Clear user information from local storage
    localStorage.removeItem('user');
    setLoggedIn(false);
    setEmail(null);
 
  };
  const handleLogin = async (email: string, password: string) => {
    try {
      const response: Response = await API.login(email, password);
  
      if (response.isLoginSuccessful) {
        console.log('Login successful');
        setLoggedIn(true);
        setEmail(email);
        setIsPasswordChanged(response.isPasswordChanged);
        localStorage.setItem('user',email);
        if (!response.isPasswordChanged) {
          alert('Változtasd meg a jelszavadat!');
        }
      } else {
        alert('Hibás email vagy jelszó!');
      }
    } catch (error) {
      console.error('Error in login:', error);
      alert('Hibás email vagy jelszó!');
    }
     
  };

  return (
    <Router>
    <div className="App">
      {loggedIn ? null : <h1>Bejelentkezés</h1>}
      {loggedIn ? null : <LoginForm onLogin={handleLogin}/>}
      <Routes>
  <Route path="/" element={loggedIn ? <Navigate to="/Profile" state={{ email }} /> : null} />
  {loggedIn ? <Route path="/Profile" element={<Profile email={email || ''} logout={handleLogout} />} /> : null}
  <Route path="/Statistics" element={<Statistic email={email || ''}/>} />
  <Route path="/GetTestResultsForCourse" element={<TestResults email={email || ''} />} />
  <Route path="/SignatureCondition" element={<SignatureCondition email={email || ''} />} />
  <Route path="/OfferedGrade" element={<OfferedGrade email={email || ''} />} />
</Routes>
    </div>
    </Router>
  );
};

export default App;
