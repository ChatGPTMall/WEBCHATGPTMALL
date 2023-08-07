import React, {useState} from 'react';
import {roomAccessApi} from './../apiCalls/roomAccessApi'
import { WithContext as ReactTags } from 'react-tag-input';
  import React, { useContext, useEffect, useState } from "react";
  import { Context } from "../context/contextApi";
  import SpinFC from "antd/es/spin";
  import {
    Avatar,
    Button,
    Checkbox,
    Dropdown,
    Form,
    Image,
    Input,
    Modal,
    Select,
    Table,
    Tag,
  } from "antd";
  import { useLocation, useParams } from "react-router-dom";
  import { getRoomItems } from "../apiCalls/getItems";
  import {
    CopyOutlined,
    FacebookFilled,
    InstagramFilled,
    LinkedinFilled,
    ShareAltOutlined,
  } from "@ant-design/icons";
  import fbIcon from "../assets/facebook.png";
  import networkingIcon from "../assets/networking.png";
  import instagramIcon from "../assets/instagram.png";
  import linkedInIcon from "../assets/linkedin.png";
  import twitterIcon from "../assets/twitter.png";
  import emailIcon from "../assets/email.png";
  import { sendEmail } from "../apiCalls/sendMail";
  import { toast } from "react-toastify";
  import { FaCopy } from "react-icons/fa";
  import { itemsShare } from "../apiCalls/itemsShare";
  
  const ShareRoomAccess = () => {
    return (
  //   const [itemsData, setItemsData] = useState(undefined);
  //   const [search, setSearch] = useState(undefined);
  //   const [sort, setSort] = useState("name");
  //   const [loading, setLoading] = useState(false);
  //   const [isPrivate, setIsPrivate] = useState(false);
  //   const [open, setOpen] = useState(false);
  //   const [email, setEmail] = useState("");
  //   const [productId, setProductId] = useState(null);
  //   const [confirmLoading, setConfirmLoading] = useState(false);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [title, setTitle] = useState("");
  //   const location = useLocation();
  //   const params = useParams();
  //   const [formData, setFormData] = useState({
  //     roomIds: [],
  //     Organization: params.segment1,
  //     itemId: "",
  //   });
  //   const [inputIdValue, setInputIdValue] = useState("");
  //   const showModal = (title, id) => {
  //     setTitle(title);
  //     setProductId(id);
  //     setOpen(true);
  //   };
  //   const onCopyClick = async (productLink) => {
  //     try {
  //       await navigator.clipboard.writeText(productLink);
  //       toast.success("Link Copied", {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //     } catch (err) {
  //       toast.success("Something Went wrong", {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //     }
  //   };
  //   const onOrgOkClick = async () => {
  //     if (formData.roomIds.length < 1 || formData.Organization.length == 0) {
  //       toast.error("Plz Fill All Fields", {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //     } else {
  //       try {
  //         const { data } = await itemsShare({
  //           rooms: formData.roomIds,
  //           organization: formData.Organization,
  //           item_id: formData.itemId,
  //         });
  //         toast.success(data.msg, {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //         setFormData({ ...formData, roomIds: [], Organization: "" });
  //       } catch (error) {
  //         toast.error(error.message, {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //       }
  //     }
  //   };
  //   function getRandomColor() {
  //     const tagColors = [
  //       "magenta",
  //       "red",
  //       "volcano",
  //       "orange",
  //       "gold",
  //       "lime",
  //       "green",
  //       "cyan",
  //       "geekblue",
  //       "purple",
  //     ];
  
  //     const randomIndex = Math.floor(Math.random() * tagColors.length);
  //     const randomColor = tagColors[randomIndex];
  //     return randomColor;
  //   }
  //   const getItems = async () => {
  //     try {
  //       const roomKey = localStorage.getItem("room_key");
  //       const params = {
  //         search,
  //         roomKey,
  //         sort,
  //         isPrivate,
  //       };
  //       setLoading(true);
  //       const data = await getRoomItems("room/items", params);
  //       setItemsData(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setItemsData([]);
  
  //       setLoading(false);
  //     }
  //   };
  
  //   const handleCancel = () => {
  //     setOpen(false);
  //   };
  //   const handleOk = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await sendEmail({ item_id: productId, email });
  //       toast.success(data.msg, {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       setEmail("");
  //       setOpen(false);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message, {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       setLoading(false);
  //     }
  //   };
  
  //   const handleInputIdChange = (e) => {
  //     setInputIdValue(e.target.value);
  //   };
  
  //   const handleInputIdConfirm = () => {
  //     if (inputIdValue && formData.roomIds.indexOf(inputIdValue) === -1) {
  //       setFormData({
  //         ...formData,
  //         roomIds: [...formData.roomIds, inputIdValue],
  //       });
  //       setInputIdValue("");
  //     }
  //   };
  
  //   const handleTagClose = (removedTag) => {
  //     const updatedTags = formData.roomIds.filter((tag) => tag !== removedTag);
  //     setFormData({ ...formData, [formData.roomIds]: updatedTags });
  //   };
  
  //   useEffect(() => {
  //     getItems();
  //   }, [search, sort, isPrivate]);
  //   useEffect(() => {
  //     console.log(formData);
  //   }, [formData]);
  // // const [emailTags, setEmailTags] = useState([]);
  // // const roomKey = localStorage.getItem("room_key");
  // const response = roomAccessApi()
  // console.log('response', response)

  //   // Function to handle when a new email tag is added
  //   const handleAddition = (tag) => {
  //     setEmailTags([...emailTags, tag]);
  //   };
  
  //   // Function to handle when a email tag is deleted
  //   const handleDelete = (i) => {
  //     setEmailTags(emailTags.filter((tag, index) => index !== i));
  //   };

  // return(
  //     <div className="d-flex justify-content-between align-items-center">
  //         {/* email model */}
  //         <Modal
  //           title={
  //             <h5>
  //               Share
  //               <span className="mx-3" style={{ color: "gold" }}>
  //                 title
  //               </span>
  //             </h5>
  //           }
  //           open={open}
  //           onOk={handleOk}
  //           confirmLoading={confirmLoading}
  //           onCancel={handleCancel}
  //         >
  //           <Input
  //             className="my-3"
  //             onChange={(e) => {
  //               setEmail(e.target.value);
  //             }}
  //             placeholder=" Add Email"
  //           />
  //         </Modal>

  //         <Input
  //           style={{ width: "250px" }}
  //           placeholder="Search"
  //           onChange={(e) => {
  //             setSearch(e.target.value);
  //           }}
  //         />
  //         <Modal
  //           className="w-75"
  //           title=""
  //           open={isModalOpen}
  //           onOk={onOrgOkClick}
  //           okText="Share"
  //           onCancel={() => setIsModalOpen(false)}
  //         >
  //           <div className="">
  //             <div className="row">
  //               <div
  //                 className="col-6 d-flex  flex-column"
  //                 style={{ borderRight: "1px solid gray" }}
  //               >
  //                 <h4 className="my-2">Share Item</h4>
  //                 <p className="my-2">
  //                 Share Item With Rooms
  //                 </p>
  //                 <div className="d-flex align-items-center justify-content-center py-3 mt-3">
  //                   <img
  //                     src={networkingIcon}
  //                     height={250}
  //                     width={250}
  //                     alt="icon"
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-6 py-3 px-4">
  //                 <div className="mt-5">
  //                   {formData.roomIds.map((tag, index) => (
  //                     <Tag
  //                       key={index}
  //                       style={{ color: getRandomColor() }}
  //                       closable
  //                       size="large"
  //                       onClose={() => handleTagClose(tag)}
  //                     >
  //                       {tag}
  //                     </Tag>
  //                   ))}
  //                 </div>
  //                 <div className="mt-4">
  //                   <p className="my-2">Room Id:</p>
  //                   <Input
  //                     placeholder="Room Ids"
  //                     onChange={handleInputIdChange}
                      
  //                     onPressEnter={handleInputIdConfirm}
  //                     onBlur={handleInputIdConfirm}
  //                     value={inputIdValue}
  //                   ></Input>
  //                 </div>
  //                 <div className="mt-4">
  //                   <p className="my-2">Organization:</p>

  //                   <Input
  //                     placeholder="Organization"
  //                     onChange={(e) =>
  //                       setFormData({
  //                         ...formData,
  //                         Organization: e.target.value,
  //                       })
  //                     }
                      
  //                     value={formData.Organization}
  //                   ></Input>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </Modal>
  <div>
     <ReactTags
        tags={emailTags}
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        placeholder="Enter email and press enter..."
        classNames={{
          tagsInput: 'tagsInput',
          tag: 'tag',
          remove: 'removeTag',
          tagInput: 'input',
          selected: 'selected',
          activeSuggestion: 'activeSuggestion',
        }}
        inputAttributes={{
          style: emailTags.length ? styles.inputFocused : styles.input,
        }}
      />
    </div>
      );

}
export default ShareRoomAccess