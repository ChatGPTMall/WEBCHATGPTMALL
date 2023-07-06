import React, { useState } from 'react'
import networkingIcon from "../assets/networking.png";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { Input, Modal, Tag } from 'antd';
import { messageShare } from '../apiCalls/messageShare';

function ShareModel({isShareModelCompOpen,setIsShareModelCompOpen,id}) {
  // const [isModalOpen, setIsModalOpen] = useState(isShareModelCompOpen);
  const [inputIdValue, setInputIdValue] = useState("");

  const params = useParams();

  const [formData, setFormData] = useState({
    roomIds: [],
    Organization: params.segment1,
    itemId: "",
  });
  const handleInputIdChange = (e) => {
    setInputIdValue(e.target.value);
  };
  const handleTagClose = (removedTag) => {
    const updatedTags = formData.roomIds.filter((tag) => tag !== removedTag);
    setFormData({ ...formData, [formData.roomIds]: updatedTags });
  };
  const handleInputIdConfirm = () => {
    if (inputIdValue && formData.roomIds.indexOf(inputIdValue) === -1) {
      setFormData({
        ...formData,
        roomIds: [...formData.roomIds, inputIdValue],
      });
      setInputIdValue("");
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
  const onOrgOkClick = async () => {
    if (formData.roomIds.length < 1 || formData.Organization.length == 0) {
      toast.error("Plz Fill All Fields", {
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
        const { data } = await messageShare({
          rooms: formData.roomIds,
          organization: formData.Organization,
          history_id: id,
        });
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
        setFormData({ ...formData, roomIds: [], Organization: "" });
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
  return (
    <Modal
            className="w-75"
            title=""
            open={isShareModelCompOpen}
            onOk={onOrgOkClick}
            okText="Share"
            onCancel={() => {setIsShareModelCompOpen(false)}}
          >
            <div className="">
              <div className="row">
                <div
                  className="col-6 d-flex  flex-column"
                  style={{ borderRight: "1px solid gray" }}
                >
                  <h4 className="my-2">Share Message</h4>
                  <p className="my-2">
                  Share Messages With Rooms 
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
                    {formData.roomIds.map((tag, index) => (
                      <Tag
                        key={index}
                        style={{ color: getRandomColor() }}
                        closable
                        size="large"
                        onClose={() => handleTagClose(tag)}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="my-2">Room Id:</p>
                    <Input
                      placeholder="Room Ids"
                      onChange={handleInputIdChange}
                      
                      onPressEnter={handleInputIdConfirm}
                      onBlur={handleInputIdConfirm}
                      value={inputIdValue}
                    ></Input>
                  </div>
                  <div className="mt-4">
                    <p className="my-2">Organization:</p>

                    <Input
                      placeholder="Organization"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          Organization: e.target.value,
                        })
                      }
                      
                      value={formData.Organization}
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

  )
}

export default ShareModel
