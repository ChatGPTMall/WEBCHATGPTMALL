import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";

function SignUp() {
  const [fieldValues, setFieldValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    home_name: "",
    home_key: null,
  });
  const [errorMessages, setErrorMessages] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    home_name: "",
    home_key: "",
  });
  const [apiError, setApiError] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputClick = (event, field) => {
    const value = event.target.value;
    switch (field) {
      case "firstName":
        setFieldValues((prevState) => ({
          ...prevState,
          first_name: value,
        }));
        setErrorMessages((prevState) => ({
          ...prevState,
          first_name: "",
        }));
        break;
      case "lastName":
        setFieldValues((prevState) => ({
          ...prevState,
          last_name: value,
        }));
        setErrorMessages((prevState) => ({
          ...prevState,
          last_name: "",
        }));
        break;
      case "email":
        setFieldValues((prevState) => ({
          ...prevState,
          email: value,
        }));
        setErrorMessages((prevState) => ({
          ...prevState,
          email: "",
        }));
        break;

      case "password":
        setFieldValues((prevState) => ({
          ...prevState,
          password: value,
        }));
        setErrorMessages((prevState) => ({
          ...prevState,
          password: "",
        }));
        break;

      case "homeName":
        setFieldValues((prevState) => ({
          ...prevState,
          home_name: value,
        }));
        setErrorMessages((prevState) => ({
          ...prevState,
          home_name: "",
        }));
        break;
      case "homeKey":
        setFieldValues((prevState) => ({
          ...prevState,
          home_key: value,
        }));
        setErrorMessages((prevState) => ({
          ...prevState,
          home_key: "",
        }));
        break;
    }
  };

  const handleSignUpForm = async (event) => {
    setApiError("");
    event.preventDefault();
    const valid = validate();
    if (valid) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://chatgptmall.tech/api/v2/register/",
          fieldValues
        );
        localStorage.setItem("user_id", response.data.user_id);
        setLogin(true);
        setLoading(false);
      } catch (error) {
        setApiError(error.response.data.email);
      }
    }
  };

  const validate = () => {
    let valid = true;
    const error = "please enter value here";
    if (!fieldValues.first_name) {
      setErrorMessages((prevState) => ({
        ...prevState,
        first_name: error,
      }));
      valid = false;
    }
    if (!fieldValues.last_name) {
      setErrorMessages((prevState) => ({
        ...prevState,
        last_name: error,
      }));
      valid = false;
    }
    if (!fieldValues.email) {
      setErrorMessages((prevState) => ({
        ...prevState,
        email: error,
      }));
      valid = false;
    }
    if (!fieldValues.home_name) {
      setErrorMessages((prevState) => ({
        ...prevState,
        home_name: error,
      }));
      valid = false;
    }
    if (fieldValues.home_key < 1) {
      setErrorMessages((prevState) => ({
        ...prevState,
        home_key: error,
      }));
      valid = false;
    }
    if (!fieldValues.password) {
      setErrorMessages((prevState) => ({
        ...prevState,
        password: error,
      }));
      valid = false;
    }

    return valid;
  };

  return (
    <div className="w-full h-full flex justify-center">
      {!login && (
        <div className="w-fit rounded-xl shadow-lg flex flex-col px-5 py-8 justify-center items-center my-5">
          <h3 className="font-Poppins text-3xl font-semibold mb-5 text-textColor ">
            Signup
          </h3>

          {/* {loading && <h5 style={{ color: "white" }}>Loading...</h5>} */}
          <p className="text-red-500 font-Poppins text-sm">{apiError}</p>
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="firstname"
                className="font-Poppins text-xl font-medium text-textColor "
              >
                First Name <span className="required">*</span>
              </label>
              <input
                className="border-b-2 w-96 outline-none font-Poppins text-lg"
                onChange={(event) => handleInputClick(event, "firstName")}
                required
                type="text"
                id="firstname"
                name="firstname"
              />
              <p className="text-red-500 font-Poppins text-sm">
                {errorMessages.first_name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="lastname"
                className="font-Poppins text-xl font-medium text-textColor "
              >
                Last Name <span className="required">*</span>
              </label>
              <input
                className="border-b-2 w-96 outline-none font-Poppins text-lg"
                onChange={(event) => handleInputClick(event, "lastName")}
                required
                type="text"
                id="lastname"
                name="lastname"
              />
              <p className="text-red-500 font-Poppins text-sm">
                {errorMessages.last_name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-Poppins text-xl font-medium text-textColor "
              >
                Email <span className="required">*</span>
              </label>
              <input
                className="border-b-2 w-96 outline-none font-Poppins text-lg"
                onChange={(event) => handleInputClick(event, "email")}
                required
                type="email"
                id="email"
                name="email"
              />
              <p className="text-red-500 font-Poppins text-sm">
                {errorMessages.email}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="font-Poppins text-xl font-medium text-textColor "
              >
                Password <span className="required">*</span>
              </label>
              <input
                className="border-b-2 w-96 outline-none font-Poppins text-lg"
                onChange={(event) => handleInputClick(event, "password")}
                required
                type="password"
                id="password"
                name="password"
              />
              <p className="text-red-500 font-Poppins text-sm">
                {errorMessages.password}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="homename"
                className="font-Poppins text-xl font-medium text-textColor "
              >
                Home Name <span className="required">*</span>
              </label>
              <input
                className="border-b-2 w-96 outline-none font-Poppins text-lg"
                onChange={(event) => handleInputClick(event, "homeName")}
                required
                type="text"
                id="homename"
                name="homename"
              />
              <p className="text-red-500 font-Poppins text-sm">
                {errorMessages.home_name}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="homekey"
                className="font-Poppins text-xl font-medium text-textColor "
              >
                Home Key <span className="required">*</span>
              </label>
              <input
                className="border-b-2 w-96 outline-none font-Poppins text-lg"
                onChange={(event) => handleInputClick(event, "homeKey")}
                required
                type="number"
                id="homekey"
                name="homekey"
              />
              <p className="text-red-500 font-Poppins text-sm">
                {errorMessages.home_key}
              </p>
            </div>
            <div className="w-full flex items-center justify-center my-4">
              <button
                type="submit"
                onClick={handleSignUpForm}
                // onClick={handleLoginForm}
                className="rounded-full px-5  bg-gradient-to-r from-cyan-500 to-blue-500 py-2 font-Poppins font-semibold text-xl text-white"
              >
                Signup
              </button>
            </div>
          </form>
          <div className="flex gap-2">
            <p className="font-Poppins text-xl font-regular text-textColor ">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="font-Poppins h-fit text-xl font-regular text-textColor  hover:text-primaryBlue hover:border-b-2 hover:border-primaryBlue"
            >
              Login
            </Link>
          </div>
        </div>
      )}
      {/* {login && <Login />} */}
    </div>
  );
}
export default SignUp;
