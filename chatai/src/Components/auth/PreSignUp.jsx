import React, { useEffect, useState } from 'react';
import './PreSignUp.css'; // Update the CSS import accordingly
import SignUp from './SignUp';
import Login from './Login';

function PreSignUp() {
  const [lines, setLines] = useState([]);
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  const handleSignUp = () => {
    setSignUp(true)
  }

  const handleLogin = () => {
    setLogin(true)
  }

  return (
    <>
    { !signUp && !login && (
      <div className="container-main">
      <div className="left-column">
        <div className="dark-blue-box">
          <p className="paragraph">Homelinked</p>
        <h3 className="heading-three">Welcome to Homelinked Please Sign up or Login</h3>
        </div>
      </div>
      <div className="right-column">
        <div className="black-box">
          <h2>Get Started</h2>
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
