import React, {useState} from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login'

function SignUp() {
  const [fieldValues, setFieldValues] = useState({first_name: '', last_name: '', email: '', password: '', home_name: '', home_key: null})
  const [errorMessages, setErrorMessages] = useState({first_name: '', last_name: '', email: '', password: '', home_name: '', home_key: ''})
  const [apiError, setApiError] = useState('')
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputClick = (event, field) => {
    const value = event.target.value
 switch(field){
    case 'firstName':
      setFieldValues((prevState) => ({
        ...prevState,  first_name: value
      }))
      setErrorMessages((prevState) => ({
        ...prevState,  first_name: ''
      }))
      break;
    case 'lastName':
      setFieldValues((prevState) => ({
        ...prevState,  last_name: value
      }))
      setErrorMessages((prevState) => ({
        ...prevState,  last_name: ''
      }))
      break;
    case 'email':
      setFieldValues((prevState) => ({
        ...prevState,  email: value
      }))
      setErrorMessages((prevState) => ({
        ...prevState,  email: ''
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
   
    case 'homeName':
      setFieldValues((prevState) => ({
        ...prevState,  home_name: value
      }))
      setErrorMessages((prevState) => ({
        ...prevState,  home_name: ''
      }))
      break;
      case 'homeKey':
      setFieldValues((prevState) => ({
        ...prevState,  home_key: value
      }))
      setErrorMessages((prevState) => ({
        ...prevState,  home_key: ''
      }))
      break;
    }
  }

  const handleSignUpForm = async (event) => {
    setApiError('')
    event.preventDefault()
    const valid = validate()
    if(valid) {
      try{
        setLoading(true)
        const response = await axios.post('https://chatgptmall.tech/api/v2/register/', fieldValues)
        localStorage.setItem('user_id', response.data.user_id)
        setLogin(true)
        setLoading(false)
      } catch(error) {
        setApiError(error.response.data.email)
      }
    }
  }

  const validate = () => {
    let valid = true
    const error = 'please enter value here'
    if(!fieldValues.first_name) {
      setErrorMessages((prevState) => ({
        ...prevState, first_name: error
      }))
      valid = false
    }
    if(!fieldValues.last_name) {
      setErrorMessages((prevState) => ({
        ...prevState, last_name: error
      }))
      valid = false
    }
    if(!fieldValues.email) {
      setErrorMessages((prevState) => ({
        ...prevState, email: error
      }))
      valid = false
    }
    if(!fieldValues.home_name) {
      setErrorMessages((prevState) => ({
        ...prevState, home_name: error
      }))
      valid = false
    }
    if(fieldValues.home_key<1) {
      setErrorMessages((prevState) => ({
        ...prevState, home_key: error
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
    <div className='room'>
    {!login && (<div className="signup-form">
        <h3>Register</h3>
        {loading && <h5 style={{color:"white"}}>Loading...</h5>}
        <p className='error-message'>{apiError}</p>
      <form>
        <div className="form-group">
          <label htmlFor="firstname">
            First Name <span className="required">*</span>
          </label>
          <input onChange={(event) => handleInputClick(event, 'firstName')} required type="text" id="firstname" name="firstname" />
          <p className='error-message'>{errorMessages.first_name}</p>
        </div>
        <div className="form-group">
          <label htmlFor="lastname">
            Last Name <span className="required">*</span>
          </label>
          <input onChange={(event) => handleInputClick(event, 'lastName')} required type="text" id="lastname" name="lastname" />
          <p className='error-message'>{errorMessages.last_name}</p>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input onChange={(event) => handleInputClick(event, 'email')} required type="email" id="email" name="email" />
          <p className='error-message'>{errorMessages.email}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input onChange={(event) => handleInputClick(event, 'password')} required type="password" id="password" name="password" />
          <p className='error-message'>{errorMessages.password}</p>
        </div>
        <div className="form-group">
          <label htmlFor="homename">
            Home Name <span className="required">*</span>
          </label>
          <input onChange={(event) => handleInputClick(event, 'homeName')} required type="text" id="homename" name="homename" />
          <p className='error-message'>{errorMessages.home_name}</p>
        </div>

        <div className="form-group">
          <label htmlFor="homekey">
            Home Key <span className="required">*</span>
          </label>
          <input onChange={(event) => handleInputClick(event, 'homeKey')} required type="number" id="homekey" name="homekey" />
          <p className='error-message'>{errorMessages.home_key}</p>
        </div>
        <button type="submit" onClick={handleSignUpForm}>Sign Up</button>
      </form>
    </div>)}
    {login && <Login/>}
    </div>
  );
}
export default SignUp;
