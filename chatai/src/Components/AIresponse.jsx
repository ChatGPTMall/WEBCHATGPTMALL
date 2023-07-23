import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AIresponse() {
  const { state } = useLocation();
  const [value,setValue]=useState(state)
  const navigate = useNavigate();
  const onCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Text Copied", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      toast.success("Something Went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (!state) {
      navigate(-1);
    }
  }, []);
  return (
    <div className="ai_image_response_container p-1 p-sm-3  position-relative">
        

      <TextArea value={value} onChange={(e)=>{setValue(e.target.value)}} className="w-100 p-5  h-100" />
      <Button type="link" onClick={onCopyClick} className="position-absolute mt-2" style={{right:50}}>Copy</Button>
        

    </div>
  );
}

export default AIresponse;
