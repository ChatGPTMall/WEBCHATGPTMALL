import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Spin,
  Upload,
  message,
} from "antd";
import {
  CustomerServiceOutlined,
  PlusSquareOutlined,
  UploadOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import { uploadItem } from "../../apiCalls/uploadRoomItem";
import { toast } from "react-toastify";
import { Context } from "../../context/contextApi";
import TextArea from "antd/es/input/TextArea";

import { chatgptmallToomTextToText } from "../../apiCalls/chatgptmallToomTextToText";
import { getRoomQueries } from "../../apiCalls/getRoomQueries";
import Queries from "../Queries";


const { Search } = Input;

function RoomItems() {
  const {
    openai_textToText
  } = useContext(Context);
  const [searchResponse,setSearchResponse]=useState("")
  const [queries, setQueries] = useState([]);
  const [modelOpen2, setModelOpen2] = useState(false);

  const [loading, setLoading] = useState(false);
  const [uploadItemsModelOpen, setUploadItemsModelOpen] = useState(false);
  const [isAI, setIsAI] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate=useNavigate()
  const handleUploadItem = async ({
    name,
    description,
    category,
    price,
    image,
    video,
    isPrivate,
  }) => {
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

  //for customer support
  const handleSupportClick = async () => {
    try {
      setModelOpen2(true);
      setLoading(true);
      const key = localStorage.getItem("key");
      const data = await getRoomQueries(key);
      setQueries(data);
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
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

{/* for customer support */}
      <Modal
        // bodyStyle={{background:"red"}}
        title={<h5 className="my-3 pb-3 text-center"> Customer Support</h5>}
        centered
        closable={false}
        open={modelOpen2}
        footer={[]}
        width={"50%"}
      >
        <div className="queries_container ">
        {loading && <Spin />}

          {!loading && queries.map((query)=>{
            if(query.has_replied){

              return <Queries key={query.id} {...query} admin={false}/>
            }
          })}
          </div>
        

        <Button
          style={{ position: "sticky", bottom: 0 ,marginTop:"100px" }}
          onClick={() => {
            setModelOpen2(false);
          }}
        >
          Close
        </Button>
      </Modal>


      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={()=>{navigate("view-items")}}
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
      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={handleSupportClick}
      >
        <CustomerServiceOutlined />
        Customer Support
      </Button>
    </>
  );
}

export default RoomItems;
