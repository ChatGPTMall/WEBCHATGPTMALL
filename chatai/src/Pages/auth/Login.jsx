import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { apiClient } from "../../apiCalls/appService";
import { getUser } from "../../apiCalls/auth";
import { Context } from "../../context/contextApi";
import { toast } from "react-toastify";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const [passwordType, setPasswordType] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const {
    get_User,
    setRoom_Id,
    setRoom_Key,
    user,
    getRoomCustomer
  } = useContext(Context);

  useEffect(() => {
    get_User()
  }, []);
  useEffect(() => {
    if (user) {
      getRoomCustomer(user.home_name, user.home_key)
      setRoom_Id(user.home_name)
      setRoom_Key(user.home_key)
    }
  }, [user])
  const Login = async (e) => {
    e.preventDefault();

    try {
      // setLoading(true);
      const response = await apiClient.Login(loginData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("is_active", response.data.is_active);
      get_User()

    } catch (error) {
      setApiError(error.response.data.non_field_errors);
    }

  };



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
          <div>
            <Link
              to="/otp/login"
              className="font-Poppins h-fit text-lg font-regular hover:text-primaryBlue hover:border-b-2 hover:border-primaryBlue text-textColor "
            >
              Login With OTP
            </Link>
          </div>
          <div>
            <Link
              to="/wechat/login"
              className="font-Poppins h-fit text-lg font-regular hover:text-primaryBlue hover:border-b-2 hover:border-primaryBlue text-textColor "
            >
              Login With Wechat
            </Link>
          </div>
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
