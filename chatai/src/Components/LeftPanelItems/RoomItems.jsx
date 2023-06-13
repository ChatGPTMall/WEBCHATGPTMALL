import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRoomItems } from "../../apiCalls/getItems";
import Modal from "antd/es/modal/Modal";
import SpinFC from "antd/es/spin";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import {
  PlusSquareOutlined,
  UploadOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import { uploadItem } from "../../apiCalls/uploadRoomItem";
import { toast } from "react-toastify";
import { Context } from "../../context/contextApi";
import TextArea from "antd/es/input/TextArea";

import { chatgptmallToomTextToText } from "../../apiCalls/chatgptmallToomTextToText";


const { Search } = Input;

function RoomItems() {
  const {
    openai_textToText
  } = useContext(Context);
  const [searchResponse,setSearchResponse]=useState("")
  const [itemsData, setItemsData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [listItemsModelOpen, setListItemsModelOpen] = useState(false);
  const [uploadItemsModelOpen, setUploadItemsModelOpen] = useState(false);
  const [isAI, setIsAI] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const handleItemsClick = async () => {
    try {
      const roomId = location.pathname.split("/")[2];
      setLoading(true);
      setListItemsModelOpen(true);
      const { data } = await getRoomItems("room/items", roomId);
      setItemsData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleUploadItem = async ({
    name,
    description,
    category,
    price,
    image,
    video,
    isPrivate,
  }) => {
    console.log();
    const roomId = location.pathname.split("/")[2];
    const formData = new FormData();
    formData.append("image", image[0].originFileObj);
    if (video) {
      formData.append("video", video[0].originFileObj);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("room", roomId);
    formData.append("is_private", isPrivate ? isPrivate : false);

    try {
      setLoading(true);
      const { data } = await uploadItem("room/items/upload/", formData);
      toast.success("Item Uploaded Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUploadItemsModelOpen(false);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUploadItemsModelOpen(false);

      setLoading(false);
    }
    form.resetFields();
  };

  const handleSearch=async(value)=>{
    try {
      setLoading(true)
      const {data}= await chatgptmallToomTextToText("room/text_to_text/",value)
      form.setFieldValue("description",data.response)
      setSearchResponse(data.response)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      
    }
   
  }
  return (
    <>
      {/* //items in room model */}
      <Modal
        // bodyStyle={{background:"red"}}
        title={<h5 className="my-3 pb-3">Items Available In Room</h5>}
        centered
        
        closable={false}
        open={listItemsModelOpen}
        footer={[
          // Other buttons or elements in the footer
          <Button
            key="ok"
            type="primary"
            onClick={() => setListItemsModelOpen(false)}
          >
            OK
          </Button>,
        ]}
        width={"50%"}
      >
        <div className="d-flex justify-content-center">
          {loading && <SpinFC size="large" className="" />}
        </div>
        {!loading &&
          itemsData &&
          itemsData.results.map((item, index) => {
            return (
              <div key={index} className="my-3">
                {/* <img src={item.image} alt=""  height={70} width={70} /> */}
                <Image
                  preview={false}
                  width={70}
                  height={70}
                  src={item.image}
                  fallback="data:image/png;base64,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"
                />
                <span className="mx-3">{item.name}</span>
              </div>
            );
          })}
      </Modal>
      {/* //uplaod items model */}
      <Modal
        // bodyStyle={{background:"red"}}
      
        title={<h5 className="my-3 pb-3 text-center"> Upload Item In Room</h5>}
        centered
        closable={false}
        open={uploadItemsModelOpen}
        footer={
          [
            // Other buttons or elements in the footer
          ]
        }
        width={"50%"}
      >
        <div className="px-3">
          <Form
            className="overflow-hidden"
            form={form}
            onFinish={handleUploadItem}
            encType="multipart/form-data"
          >
            <Form.Item
              name="name"
              className="mt-2"
              rules={[{ required: true, message: "Please Input Item Name!" }]}
            >
              <Input size="large" placeholder="Item Name" />
            </Form.Item>
            <div className="mb-4">
              <Button
                className="my-0"
                type="link"
                onClick={() => {
                  setIsAI(true);
                }}
              >
                Generate content With our AI
              </Button>
              {isAI && (
                <Search size="large" style={{ width: "100%" }} onSearch={handleSearch} loading={loading} enterButton="Search"></Search>
              )}
            </div>
            <Form.Item
              className="mt-2"
              name="description"
              rules={[
                { required: true, message: "Please Input Item Description" },
              ]}
            >
              <TextArea placeholder="Item Description" />
            </Form.Item>
            <div className="w-100 justify-content-between">
              <div className=" d-flex w-100">
                <Form.Item
                  name="category"
                  className="w-50 mt-2 "
                  rules={[
                    { required: true, message: "Please Select Item Category" },
                  ]}
                >
                  <Select
                  size="large"
                    placeholder="Category"
                    options={[
                      { value: "electronics", label: "Electronics" },
                      { value: "clothing", label: "Clothing & Fashion" },
                      { value: "home-furniture", label: "Home & Furniture" },
                      { value: "health-beauty", label: "Health & Beauty" },
                      { value: "sports-outdoors", label: "Sports & Outdoors" },
                      { value: "books-media", label: "Books & Media" },
                    ]}
                  />
                </Form.Item>
                <span className="mx-2"></span>
                <Form.Item
                  name="price"
                  className="w-50 mt-2"
                  rules={[
                    { required: true, message: "Please Input Item Price" },
                  ]}
                >
                  <Input size="large" placeholder="Item Price" min={0} type="number" />
                </Form.Item>
              </div>
              <div className="d-flex justify-content-between flex-wrap">
                <Form.Item
                  name="image"
                  valuePropName="fileList"
                  className="mt-2"
                  getValueFromEvent={(e) => e.fileList}
                  rules={[
                    { required: true, message: "Please Upload Item Image" },
                  ]}
                >
                  <Upload
                  
                    name="image"
                    listType="picture"
                    accept="image/*"
                    multiple={false}
                    beforeUpload={() => false}
                  >
                    <Button type="primary" style={{ minWidth: 310 }} icon={<UploadOutlined />}>
                      Upload Image
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  name="video"
                  className="mt-2"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
                >
                  <Upload
                    name="video"
                    listType="picture"
                    accept="video/*"
                    multiple={false}
                    beforeUpload={() => false}
                  >
                    <Button type={"primary"} style={{ minWidth: 310 }} icon={<UploadOutlined />}>
                      Upload Video
                    </Button>
                  </Upload>
                </Form.Item>
              </div>
              <Form.Item name="isPrivate" valuePropName="checked">
                <Checkbox style={{ color: "white" }}>Is Private</Checkbox>
              </Form.Item>
            </div>
            <div className="d-flex">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Upload
                </Button>
              </Form.Item>
              <span className="mx-2"></span>
              {!loading && (
                <Form.Item>
                  <Button
                    onClick={() => setUploadItemsModelOpen(false)}
                    className="login-form-button"
                  >
                    Cancel
                  </Button>
                </Form.Item>
              )}
            </div>
          </Form>
        </div>
      </Modal>
      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={handleItemsClick}
      >
        <WindowsOutlined />
        Room Items
      </Button>
      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={() => {
          setUploadItemsModelOpen(true);
        }}
      >
        <PlusSquareOutlined className="" />
        Upload Item
      </Button>
    </>
  );
}

export default RoomItems;
