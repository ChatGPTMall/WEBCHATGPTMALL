import React from 'react'
import { cilLevelDown } from "@coreui/icons";
import { toast } from "react-toastify";
import CIcon from "@coreui/icons-react";

function DropDownButton({className,showDropDown,setShowDropdown,setValue}) {
    const languages = [
        { text: "English", value: "IN" },
        { text: "Spanish", value: "SP" },
        { text: "French", value: "FR" },
        { text: "German", value: "GM" },
        { text: "Italian", value: "IT" },
        { text: "Portuguese", value: "PR" },
        { text: "Russian", value: "RU" },
        { text: "Chinese", value: "CH" },
        { text: "Japanese", value: "JP" },
        { text: "Korean", value: "KR" },
        { text: "Arabic", value: "AR" },
        { text: "Urdu", value: "urdu" },
    
      ];
  return (
    <div className={className}>
      <button
        onClick={() => {
          setShowDropdown(!showDropDown);
        }}
        className="d-flex align-items-center justify-content-center gap-2 gap-1 btn btn-sm py-1 px-2 btn-dark rounded-3 border-0"
      >
        <span>
          {" "}
          {localStorage.getItem(`${className}`)
            ? localStorage.getItem(`${className}`)
            : className}{" "}
        </span>
        <span>
          {" "}
          <CIcon
            style={{ width: "18px" }}
            color="#989898"
            icon={cilLevelDown}
          ></CIcon>{" "}
        </span>
      </button>
      {showDropDown && (
        <span className="language-list d-flex flex-column justify-content-center align-items-center">
          {languages.map((trans, index) => {
            return (
              <span
                className="langs"
                key={index}
                onClick={() => {
                  setValue(trans.text);
                  localStorage.setItem(`${className}`, trans.text);
                  localStorage.removeItem(`${className}`=="language"?"translate":(`${className}`=="translate"?"language":""));
                  setShowDropdown(false);
                //   toast.success(`${className} changed successfully`);
                }}
              >
                {trans.text}
              </span>
            );
          })}
        </span>
      )}
    </div>
  )
}

export default DropDownButton
