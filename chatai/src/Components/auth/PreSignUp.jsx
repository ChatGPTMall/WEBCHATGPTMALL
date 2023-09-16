import React, { useEffect, useState } from 'react';
import './PreSignUp.css'; // Update the CSS import accordingly
import SignUp from './SignUp';
import Login from './Login';

function PreSignUp() {
  const [lines, setLines] = useState([]);
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  const messages = [
    "Welcome,",
    "Please sign up or log in here"
  ];
  const typingSpeed = 35;

  useEffect(() => {
    let currentIndex = 0;
    let currentLineIndex = 0;
    const interval = setInterval(() => {
      if (currentLineIndex < messages.length) {
        const currentMessage = messages[currentLineIndex];
        if (currentIndex <= currentMessage.length) {
          const line = currentMessage.slice(0, currentIndex);
          setLines((prevLines) => [...prevLines.slice(0, -1), line]);
          currentIndex++;
        } else {
          currentIndex = 0;
          currentLineIndex++;
          setLines((prevLines) => [...prevLines, '']);
        }
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  const handleSignUp = () => {
    setSignUp(true)
  }

  const handleLogin = () => {
    setLogin(true)
  }

  return (
    <>
    { !signUp && !login && (
      <div className="container">
      <div className="left-column">
        <div className="dark-blue-box">
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="right-column">
        <div className="black-box">
          <h2>Sign Up</h2>
          <button className="button-signup" onClick={handleSignUp}>Sign Up</button>
          <button className="button-login"  onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>)} 
   { signUp && <SignUp />}
   { login && <Login />}
    </>
  );
}

export default PreSignUp;
