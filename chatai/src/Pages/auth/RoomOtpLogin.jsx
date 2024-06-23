import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../apiCalls/appService";
import { Context } from "../../context/contextApi";

function RoomOtpLogin() {
    const [loginData, setLoginData] = useState({ otp: ""});
    const [error, setError] = useState({ otp: ""});
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const {
      setRoom_Id,
      setRoom_Key,
      user,
      getRoomCustomer
    } = useContext(Context);
  
    const Login = async (e) => {
      e.preventDefault();
      try {
        // setLoading(true);
        const response = await apiClient.WhapappLogin(loginData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("is_active", response.data.is_active);
        setRoom_Id(response.data.room_id)
        setRoom_Key(response.data.room_key)
        getRoomCustomer(response.data.room_id, response.data.room_key)
  
      } catch (error) {
        setApiError(error.response.data.error);
      }
  
    };
  
  
  
    return (
      <>
        <div className="w-full h-full flex justify-center">
          <div className="w-fit rounded-xl shadow-lg flex flex-col p-5 justify-center items-center mt-20">
            <h3 className="font-Poppins text-3xl font-semibold mb-3 text-textColor ">
              Room OTP Login
            </h3>
            <p className="text-red-500 font-Poppins text-sm">{apiError}</p>
            <form className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="otp"
                  className="font-Poppins text-lg font-medium text-textColor "
                >
                  Enter OTP <span className="text-red-500">*</span>
                </label>
                <input
                  value={loginData?.otp}
                  placeholder="Wechat OTP"
                  className="border-b-2 w-96 outline-none font-Poppins text-lg text-textColor "
                  onChange={(e) =>
                    setLoginData({ ...loginData, otp: e.target.value })
                  }
                  required
                  type="text"
                  id="otp"
                  name="otp"
                />
                {error && (
                  <p className="text-red-500 font-Poppins text-sm ">
                    {error?.otp}
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
              <p className="font-Poppins text-lg font-regular text-textColor ">Do not have an account?</p>
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

export default RoomOtpLogin