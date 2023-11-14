import React, { useState } from "react";
import {roomAccessApi} from './../apiCalls/roomAccessApi.js'
import {
  Input,
  Modal,
  Tag,
  Select
} from "antd";
import { toast } from "react-toastify";
import networkingIcon from "../assets/networking.png";
import {useNavigate } from "react-router-dom";





const ShareRoomAccess = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [emails, setEmails] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [userType, setUserType] = useState('')
  const navigate = useNavigate();


  const onOrgOkClick = async () => {
    if (emails?.length  < 1 || isValidEmail(inputValue.trim())) {
      toast.error("Please enter a valid email", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (userType?.length < 3) {
      toast.error("Please Select User Type", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const { data } = await roomAccessApi(emails, userType);
        toast.success(data.msg, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
         setEmails([]);
      } catch (error) {
        toast.error(error.message, {
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
    }
  };

  function getRandomColor() {
    const tagColors = [
      "magenta",
      "red",
      "volcano",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "geekblue",
      "purple",
    ];

    const randomIndex = Math.floor(Math.random() * tagColors.length);
    const randomColor = tagColors[randomIndex];
    return randomColor;
  }

  const handleTagClose = (removedEmail) => {
    const updatedEmails = emails.filter((email) => email !== removedEmail);
    setEmails(updatedEmails);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addEmailTag();
    }
  };

  // Function to handle when the input loses focus
  const handleBlur = () => {
    addEmailTag();
  };

  // Function to add the email tag to the state
  const isValidEmail = (email) => {
    // Simple email format check using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to add the email tag to the state
  const addEmailTag = () => {
    if (inputValue.trim() !== '') {
      setEmails([...emails, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCancleClick = () => {
    navigate(`/${localStorage.getItem("room_id")}`);
  }

  const usersType = [
    {label: 'Visitor', value: 'visitor'},
    {label: 'Contributor', value: 'contributor'},
 ]

 const handleUserTypeChange = (value) => {
  setUserType(value)
 }

  return(
    <div>
      <div className="d-flex justify-content-between align-items-center">
      <Modal
        className="w-75"
        title=""
        open={isModalOpen}
        onOk={onOrgOkClick}
        okText="Share"
        onCancel={handleCancleClick}
          >
            <div className="">
              <div className="row">
                <div
                  className="col-6 d-flex  flex-column"
                  style={{ borderRight: "1px solid gray" }}
                >
                  <h4 className="my-2">Share Room Access</h4>
                  <p className="my-2">
                  Share Access With Email
                  </p>
                  <div className="d-flex align-items-center justify-content-center py-3 mt-3">
                    <img
                      src={networkingIcon}
                      height={250}
                      width={250}
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="col-6 py-3 px-4">
                  <div className="mt-5">
                    {emails.map((email, index) => (
                      <Tag
                        key={index}
                        style={{ color: getRandomColor() }}
                        closable
                        size="large"
                        onClose={() => handleTagClose(email)}
                      >
                        {email}
                      </Tag>
                    ))}
                  </div>
                  <div>
                  <Input
                    className="my-3"
                    placeholder="Add Email"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                   />
                  </div>
                  <div>
                  <Select
                    style={{ width: 230 }}
                    placeholder="select user Type"
                    options={usersType}
                    onChange={(value) => handleUserTypeChange(value)}
                  />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          </div>
          </div>
  )
}

export default ShareRoomAccess