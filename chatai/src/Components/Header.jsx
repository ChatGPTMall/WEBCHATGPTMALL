import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// const menu = [{
//     selectable: "",
//     items:
// }]
function Header() {
  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(true);
    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <div className="py-3 static shadow-md">
      <div className="container items-center flex justify-between ">
        <div className="">
          <p className="m-0 font-Poppins font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            Homelinked
          </p>
        </div>
        <div className="flex gap-5 items-center justify-center text-center">
          <p className="m-0 font-Poppins font-medium hover:text-primaryBlue">
            Use Cases
          </p>
          <p className="m-0 font-Poppins font-medium hover:text-primaryBlue">
            Features
          </p>
          <p className="m-0 font-Poppins font-medium hover:text-primaryBlue">
            Pricing
          </p>
        </div>
        <div>
          <button
            className="px-4 py-2 rounded-md font-Poppins bg-primaryBlue text-white"
            onClick={handleLogin}
          >
            Contact Sales
          </button>
          <button
            className="px-4 py-2 rounded-md font-Poppins bg-primaryBlue text-white"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
