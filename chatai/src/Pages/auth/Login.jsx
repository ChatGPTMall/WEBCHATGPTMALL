import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { apiClient } from "../../apiCalls/appService";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const [passwordType, setPasswordType] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isActive = localStorage.getItem("is_active");
    if (token && isActive) {
      navigate("/room/join");
    }
  }, []);

  const validate = () => {
    !emailRegex.test(loginData?.email)
      ? setError((prev) => ({
          ...prev,
          email: "Invalid Email",
        }))
      : setError((prev) => ({
          ...prev,
          email: "",
        }));
    !loginData?.password.match(emailRegex)
      ? setError((prev) => ({
          ...prev,
          password: "Wrong Password !",
        }))
      : setError((prev) => ({
          ...prev,
          password: "",
        }));
    loginData?.password.length < 8
      ? setError((prev) => ({
          ...prev,
          password: "Password should be at least 8 characters",
        }))
      : setError((prev) => ({
          ...prev,
          password: "",
        }));
  };
  const Login = async (e) => {
    e.preventDefault();
    if (validate) {
      try {
        // setLoading(true);
        const response = await apiClient.Login(loginData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("is_active", response.data.is_active);
        navigate("/room/join/");
      } catch (error) {
        setApiError(error.response.data.non_field_errors);
      }
    }
  };

  // const navigate = useNavigate();

  // const handleInputClick = (event, field) => {
  //   const value = event.target.value;
  //   switch (field) {
  //     case "username":
  //       setFieldValues((prevState) => ({
  //         ...prevState,
  //         username: value,
  //       }));
  //       setErrorMessages((prevState) => ({
  //         ...prevState,
  //         username: "",
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
  //   }
  // };

  // const handleLoginForm = async (event) => {
  //   setApiError("");
  //   event.preventDefault();
  //   const valid = validate();
  //   if (valid) {
  //     try {
  //       setLoading(true);
  //       const response = await axios.post(
  //         "https://chatgptmall.tech/api/v2/login/",
  //         fieldValues
  //       );
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("is_active", response.data.is_active);
  //       setTimeout(() => {
  //         navigate("/room/join/");
  //         setLoading(false);
  //       }, 2000);
  //     } catch (error) {
  //       setApiError(error.response.data.non_field_errors);
  //     }
  //   }
  // };

  // const validate = () => {
  //   let valid = true;
  //   const error = "please enter value here";

  //   if (!fieldValues.username) {
  //     setErrorMessages((prevState) => ({
  //       ...prevState,
  //       username: error,
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
      {/* {loading ? ( */}
      {/* <div>
          <img src="../../Spinner/Fadinglines.gif" alt="" />
        </div>
      ) : ( */}
      <div className="w-full h-full flex justify-center">
        <div className="w-fit rounded-xl shadow-lg flex flex-col p-5 justify-center items-center mt-20">
          <h3 className="font-Poppins text-3xl font-semibold mb-3 text-textColor ">
            Login
          </h3>
          {/* {loading && <h4 style={{ color: "white" }}>loading...</h4>} */}
          <p className="text-red-500 font-Poppins text-sm">{apiError}</p>
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-Poppins text-lg font-medium text-textColor "
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                value={loginData?.email}
                onBlur={validate}
                placeholder="Your Email"
                className="border-b-2 w-96 outline-none font-Poppins text-lg text-textColor "
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
                type="email"
                id="email"
                name="email"
              />
              {error && (
                <p className="text-red-500 font-Poppins text-sm ">
                  {error?.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="font-Poppins text-lg font-medium text-textColor "
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex relative ">
                <input
                  onBlur={validate}
                  value={loginData?.password}
                  placeholder="Your Password"
                  className="border-b-2 w-96 outline-none font-Poppins text-lg text-textColor relative "
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
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

              {error && (
                <p className="text-red-500 font-Poppins text-sm">
                  {error?.password}
                </p>
              )}
            </div>
            <div className="w-full flex items-center justify-center my-4">
              <button
                type="submit"
                onClick={Login}
                className="rounded-full px-5 shadow-md bg-gradient-to-r from-cyan-500 to-blue-500 py-2 font-Poppins font-semibold text-xl text-white"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex gap-2">
            <p className="font-Poppins text-lg font-regular text-textColor ">
              Do not have an account?
            </p>
            <Link
              to="/signup"
              className="font-Poppins h-fit text-lg font-regular hover:text-primaryBlue hover:border-b-2 hover:border-primaryBlue text-textColor "
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}
export default Login;
