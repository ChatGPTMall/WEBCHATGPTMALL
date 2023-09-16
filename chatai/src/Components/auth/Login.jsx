import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const [fieldValues, setFieldValues] = useState({username: '', password: ''})
  const [errorMessages, setErrorMessages] = useState({username: '', password: ''})
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()

  const handleInputClick = (event, field) => {
    const value = event.target.value
 switch(field){
    case 'username':
      setFieldValues((prevState) => ({
        ...prevState,  username: value
      }))
      setErrorMessages((prevState) => ({
        ...prevState,  username: ''
      }))
      break;
 
    case 'password':
      setFieldValues((prevState) => ({
        ...prevState,  password: value
      }))
      setErrorMessages((prevState) => ({
        ...prevState,  password: ''
      }))
      break;
    }
  }

  const handleLoginForm = async (event) => {
    setApiError('')
    event.preventDefault()
    const valid = validate()
    if(valid) {
      try{
        const response = await axios.post('https://chatgptmall.tech/api/v2/login/', fieldValues)
        localStorage.setItem('token', response.data.token)
        setTimeout(() => {
          navigate('/room/join/');
        }, 2000);
      } catch(error) {
        setApiError(error.response.data.non_field_errors)
      }
    }
  }

  const validate = () => {
    let valid = true
    const error = 'please enter value here'
   
    if(!fieldValues.username) {
      setErrorMessages((prevState) => ({
        ...prevState, username: error
      }))
      valid = false
    }
    if(!fieldValues.password) {
      setErrorMessages((prevState) => ({
        ...prevState, password: error
      }))
      valid = false
    }

    return valid
  }

  return (
    <div className="signup-form">
        <h3>Login</h3>
        <p className='error-message'>{apiError}</p>
      <form>
        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input onChange={(event) => handleInputClick(event, 'username')} required type="username" id="username" name="username" />
          <p className='error-message'>{errorMessages.username}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input onChange={(event) => handleInputClick(event, 'password')} required type="password" id="password" name="password" />
          <p className='error-message'>{errorMessages.password}</p>
        </div>
        <button type="submit" onClick={handleLoginForm}>Login</button>
      </form>
    </div>
  );
}
export default Login;
