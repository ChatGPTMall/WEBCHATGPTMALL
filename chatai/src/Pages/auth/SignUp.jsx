import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

function SignUp() {
  const [fieldValues, setFieldValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(false);
  const navigate = useNavigate();

  // validation of fields
  const validate = () => {
    !fieldValues?.first_name.match("/^[A-Za-z ]+$/") &&
    !fieldValues?.last_name.match("/^[A-Za-z ]+$/")
      ? setErrorMessages({
          ...errorMessages,
          first_name: "Only alpahbets are allowed",
          last_name: "Only alpahbets are allowed",
        })
      : setErrorMessages({ ...errorMessages, first_name: "", last_name: "" });
    !fieldValues?.email.match("/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i") &&
    !fieldValues?.password.match("/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i")
      ? setErrorMessages({
          ...errorMessages,
          email: "Invalid email!",
          password: "Password cannot be empty",
        })
      : setErrorMessages({ ...errorMessages, email: "", password: "" });
    fieldValues?.password.length < 8
      ? setErrorMessages((prev) => ({
          ...prev,
          password: "Password should be at least 8 characters",
        }))
      : setErrorMessages((prev) => ({
          ...prev,
          password: "",
        }));
  };
  const Signup = async (event) => {
    // setApiError("");
    event.preventDefault();
    if (validate) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://chatgptmall.tech/api/v2/register/",
          fieldValues
        );
        localStorage.setItem("user_id", response.data.user_id);
        navigate("/room/join");
        // setLogin(true);
        // setLoading(false);
      } catch (error) {
        // fieldValues === null || undefined
        //   ? setApiError("Fill out the fields")
        //   : setApiError(null);

        setApiError(error.response.data.email);
      }
    } else {
      navigate(0);
    }
    console.log(apiError, "api");
  };
  // const handleInputClick = (event, field) => {
  //   const value = event.target.value;
  //   switch (field) {
  //     case "firstName":
  //       setFieldValues((prevState) => ({
  //         ...prevState,
  //         first_name: value,
  //       }));
  //       setErrorMessages((prevState) => ({
  //         ...prevState,
  //         first_name: "",
  //       }));
  //       break;
  //     case "lastName":
  //       setFieldValues((prevState) => ({
  //         ...prevState,
  //         last_name: value,
  //       }));
  //       setErrorMessages((prevState) => ({
  //         ...prevState,
  //         last_name: "",
  //       }));
  //       break;
  //     case "email":
  //       setFieldValues((prevState) => ({
  //         ...prevState,
  //         email: value,
  //       }));
  //       setErrorMessages((prevState) => ({
  //         ...prevState,
  //         email: "",
  //       }));
  //       break;

  //     case "password":
  //       setFieldValues((prevState) => ({
  //         ...prevState,
  //         password: value,
  //       }));
  //       setErrorMessages((prevState) => ({
  //         ...prevState,
  //         password: "",
  //       }));
  //       break;

  //     case "homeName":
  //       setFieldValues((prevState) => ({
  //         ...prevState,
  //         home_name: value,
  //       }));
  //       setErrorMessages((prevState) => ({
  //         ...prevState,
  //         home_name: "",
  //       }));
  //       break;
  //     case "homeKey":
  //       setFieldValues((prevState) => ({
  //         ...prevState,
  //         home_key: value,
  //       }));
  //       setErrorMessages((prevState) => ({
  //         ...prevState,
  //         home_key: "",
  //       }));
  //       break;
  //   }
  // };

  // const validate = () => {
  //   let valid = true;
  //   const error = "please enter value here";
  //   if (!fieldValues.first_name) {
  //     setErrorMessages((prevState) => ({
  //       ...prevState,
  //       first_name: error,
  //     }));
  //     valid = false;
  //   }
  //   if (!fieldValues.last_name) {
  //     setErrorMessages((prevState) => ({
  //       ...prevState,
  //       last_name: error,
  //     }));
  //     valid = false;
  //   }
  //   if (!fieldValues.email) {
  //     setErrorMessages((prevState) => ({
  //       ...prevState,
  //       email: error,
  //     }));
  //     valid = false;
  //   }
  //   if (!fieldValues.home_name) {
  //     setErrorMessages((prevState) => ({
  //       ...prevState,
  //       home_name: error,
  //     }));
  //     valid = false;
  //   }
  //   if (fieldValues.home_key < 1) {
  //     setErrorMessages((prevState) => ({
  //       ...prevState,
  //       home_key: error,
  //     }));
  //     valid = false;
  //   }
  //   if (!fieldValues.password) {
  //     setErrorMessages((prevState) => ({
  //       ...prevState,
  //       password: error,
  //     }));
  //     valid = false;
  //   }

  //   return valid;
  // };

  return (
    <>
      <p className="text-red-500 font-Poppins text-sm">{apiError}</p>
      <div className="w-full h-full flex justify-center">
        {!login && (
          <div className="w-fit rounded-xl shadow-lg flex flex-col p-5 justify-center items-center my-5">
            <h3 className="font-Poppins text-3xl font-semibold mb-4 text-textColor ">
              Signup
            </h3>

            {/* {loading && <h5 style={{ color: "white" }}>Loading...</h5>} */}
            <form className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="firstname"
                  className="font-Poppins text-lg font-medium text-textColor "
                >
                  First Name <span className="required text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter Your First Name"
                  onBlur={validate}
                  className="border-b-2 w-96 outline-none font-Poppins text-lg"
                  value={fieldValues?.first_name}
                  onChange={(e) =>
                    setFieldValues({
                      ...fieldValues,
                      first_name: e.target.value,
                    })
                  }
                  required
                  type="text"
                  id="firstname"
                  name="firstname"
                />
                {errorMessages && (
                  <p className="text-red-500 font-Poppins text-sm">
                    {errorMessages.first_name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="lastname"
                  className="font-Poppins text-lg font-medium text-textColor "
                >
                  Last Name <span className="required text-red-500">*</span>
                </label>
                <input
                  onBlur={validate}
                  className="border-b-2 w-96 outline-none font-Poppins text-lg"
                  value={fieldValues?.last_name}
                  onChange={(e) =>
                    setFieldValues({
                      ...fieldValues,
                      last_name: e.target.value,
                    })
                  }
                  required
                  type="text"
                  id="lastname"
                  name="lastname"
                />
                {errorMessages && (
                  <p className="text-red-500 font-Poppins text-sm">
                    {errorMessages.last_name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="font-Poppins text-lg font-medium text-textColor "
                >
                  Email <span className="required text-red-500">*</span>
                </label>
                <input
                  onBlur={validate}
                  className="border-b-2 w-96 outline-none font-Poppins text-lg"
                  value={fieldValues?.email}
                  onChange={(e) =>
                    setFieldValues({ ...fieldValues, email: e.target.value })
                  }
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
                  className="font-Poppins text-lg font-medium text-textColor "
                >
                  Password <span className="required text-red-500">*</span>
                </label>
                <div className="flex relative ">
                  <input
                    onBlur={validate}
                    value={fieldValues?.password}
                    placeholder="Your Password"
                    className="border-b-2 w-96 outline-none font-Poppins text-lg text-textColor relative "
                    onChange={(e) =>
                      setFieldValues({
                        ...fieldValues,
                        password: e.target.value,
                      })
                    }
                    required
                    type={passwordType ? "text" : "password"}
                    id="password"
                    name="password"
                  />
                  <button
                    className="absolute right-4"
                    onClick={() => setPasswordType((prev) => !prev)}
                  >
                    {passwordType ? <EyeInvisibleFilled /> : <EyeFilled />}
                  </button>
                </div>
                <p className="text-red-500 font-Poppins text-sm">
                  {errorMessages.password}
                </p>
              </div>
              <div className="w-full flex items-center justify-center my-4">
                <button
                  type="submit"
                  onClick={Signup}
                  className="rounded-full px-5 shadow-md bg-gradient-to-r from-cyan-500 to-blue-500 py-2 font-Poppins font-semibold text-xl text-white"
                >
                  Signup
                </button>
              </div>
            </form>
            <div className="flex gap-2">
              <p className="font-Poppins text-lg font-regular text-textColor ">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="font-Poppins h-fit text-lg font-regular text-textColor  hover:text-primaryBlue hover:border-b-2 hover:border-primaryBlue"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default SignUp;
