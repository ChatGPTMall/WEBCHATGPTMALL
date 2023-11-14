import React, { useContext, useState } from "react";
import { Context } from "../context/contextApi";
import { FaPaperclip } from "react-icons/fa";
import { apiClient } from "../apiCalls/appService";



function FileUpload({ id, isFile = "image", children, onChange }) {
  const {
    setImageUpload,
    
  } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const files =
    "application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.doc, .docx";

  const images = "image/png,image/jpeg";
  const handleFileChange = (event) => {
    // Get the selected file from the input
    const file = event.target.files[0];
    setImageUpload(file);
  };

  const handleFileUpload = async (e) => {
    // Perform the file upload logic here (e.g., send the file to a server)

    if (selectedFile) {
      // You can use the FormData API to send the file to a server
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Replace 'your-upload-api-url' with the actual URL where you want to upload the file
      fetch("your-upload-api-url", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server after successful upload
          console.log(data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
      const responce = await apiClient
        .uploadImage(formData)
        .then((responce) => {
          onChange(responce);
        });
    } else {
      // Handle case where no file is selected
      console.warn("No file selected");
    }
  };
  return (
    <div style={
      {
        position: "absolute",
        top: "40px",
        color: "white",
        right: "0px"
    }
    }>
      <label
        htmlFor={id}
        className={`p-0 flex items-center cursor-pointer ${
          loading ? "fileUploadStying" : ""
        }`}
      >
        {children ?? <FaPaperclip className="mx-1 " size={30} />}
      </label>
      <input
        accept={isFile == "image" ? images : files}
        type="file"
        className={``}
        id={id}
        style={{ display: "none" }}
        onChange={(e) => {
          console.log("3333333", e);
          handleFileUpload(e)
          handleFileChange(e)
        }
        }
      />
    </div>
  );
}

export default FileUpload;
