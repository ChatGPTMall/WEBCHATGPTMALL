import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DropdownJsx from "./DropdownJsx";

const UseCasesOptions = [
  { key: "0", label: "Explainer How To" },
  { key: "1", label: "Marketing" },
  { key: "2", label: "Personalized Sales" },
  { key: "3", label: "Training & Onboarding" },
  { key: "3", label: "News" },
];
const FeaturesOptions = [
  { key: "0", label: "Generative Outfit" },
  { key: "1", label: "Custom Avatars" },
  { key: "2", label: "Voice Cloning" },
  { key: "3", label: "Photo Avatar" },
  { key: "3", label: "Text To Speech" },
  { key: "3", label: "AI Avatars" },
  { key: "3", label: "Zapier" },
];
const ResourcesOptions = [
  { key: "0", label: "Blog" },
  { key: "1", label: "Weekly Webinar" },
  { key: "2", label: "Case Studies" },
  { key: "3", label: "Help Center" },
];
const CompanyOptions = [
  { key: "0", label: "How It Works?" },
  { key: "1", label: "About Us" },
  { key: "2", label: "Our Technology" },
  { key: "3", label: "Careers" },
  { key: "3", label: "Contact Us" },
];
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
          <p
            className="m-0 font-Poppins font-bold cursor-pointer text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
            onClick={() => navigate("/")}
          >
            Homelinked
          </p>
        </div>
        <div className="flex gap-5 items-center justify-center text-center">
          <DropdownJsx
            selectable={"Use Cases"}
            items={UseCasesOptions}
            className={"font-Poppins font-medium hover:text-primaryBlue"}
          />
          <DropdownJsx
            selectable={"Features"}
            items={FeaturesOptions}
            className={"font-Poppins font-medium hover:text-primaryBlue"}
          />
          <DropdownJsx
            selectable={"Company"}
            items={CompanyOptions}
            className={"font-Poppins font-medium hover:text-primaryBlue"}
          />
          <DropdownJsx
            selectable={"Resources"}
            items={ResourcesOptions}
            className={"font-Poppins font-medium hover:text-primaryBlue"}
          />
          <p className="m-0 font-Poppins font-medium hover:text-primaryBlue">
            Pricing
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-md font-Poppins bg-primaryBlue text-white shadow-md "
            onClick={() => {}}
          >
            Contact Sales
          </button>
          <button
            className="px-4 py-2 rounded-md font-Poppins bg-primaryBlue text-white "
            onClick={handleLogin}
          >
            Login
          </button>
          {/* <button
            className="px-4 py-2 rounded-md font-Poppins border-2 border-primaryBlue text-primaryBlue bg-white shadow-md"
            onClick={handleLogin}
          >
            Contact Sales
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
