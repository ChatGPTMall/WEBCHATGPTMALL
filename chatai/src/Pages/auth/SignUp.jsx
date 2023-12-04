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
  const Signup = async (event) => {
    // setApiError("");
    event.preventDefault();
      try {
        setLoading(true);
        const response = await axios.post(
          "https://chatgptmall.tech/api/v2/register/",
          fieldValues
        );
        localStorage.setItem("user_id", response.data.user_id);
        navigate("/login");
       
      } catch (error) {
       

        setApiError(error.response.data.email);
      }
  
  };
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
