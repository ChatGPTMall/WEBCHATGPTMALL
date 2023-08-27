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
  Menu,
  Select,
  Space,
  Spin,
  Upload,
  message,
} from "antd";
import {
  AliwangwangOutlined,
  AuditOutlined,
  BuildOutlined,
  CustomerServiceOutlined,
  DollarCircleOutlined,
  FileImageOutlined,
  GlobalOutlined,
  UserOutlined,
  HeartOutlined,
  ShopOutlined,
  SettingOutlined,
  SketchOutlined,
  StockOutlined,
  SwapOutlined,
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
import { getFavourites, removeFavourites } from "../../apiCalls/favourites";
import Favorite from "../Favorite";



const { Search } = Input;

function RoomItems() {
  const visitor = localStorage.getItem('visitor')
  const contributor = localStorage.getItem('contributor')

  
  const {
    openai_textToText
  } = useContext(Context);
  const [searchResponse,setSearchResponse]=useState("")
  const [favourites,setFavorites]=useState(null)
  const [queries, setQueries] = useState([]);
  const [modelOpen2, setModelOpen2] = useState(false);
  const [modelFavOpen, setModelFavOpen] = useState(false);

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
    const roomKey = localStorage.getItem("room_key")
    const formData = new FormData();
    formData.append("image", image[0].originFileObj);
    if (video) {
      formData.append("video", video[0].originFileObj);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("room_key", roomKey);
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
      const key = localStorage.getItem("room_key");
      const data = await getRoomQueries(key);
      setQueries(data);
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.log(error)
    }
  };
  const handleFavClick=async()=>{
    try {
      setModelFavOpen(true);
      setLoading(true);
      const key = localStorage.getItem("room_key");
      const {data} = await getFavourites({"room_key":key});
      setFavorites(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.log(error)
    }
  }
  const handleHeartClick=async(favourite_id)=>{
    try {
      await removeFavourites({favourite_id})
      toast.success("Successfully removed from  Favourites", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const newFav=favourites.filter((f)=>{
       return f.id!==favourite_id
         
        

      })
      setFavorites(newFav)
    } catch (error) {
      
    }
  }
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
      <Modal
        title={<h5 className="my-3 pb-3 text-center"> Favourites</h5>}
        centered
        closable={false}
        open={modelFavOpen}
        footer={[]}
        width={"50%"}
      >
        <div className="queries_container ">
        {loading && <Spin />}

          {!loading && favourites?.map((f)=>{
            return <Favorite data={f} handleHeartClick={(id)=>handleHeartClick(id)}></Favorite>
          })}
          </div>
        

        <Button
          style={{ position: "sticky", bottom: 0 ,marginTop:"100px" }}
          onClick={() => {
            setModelFavOpen(false);
          }}
        >
          Close
        </Button>
      </Modal>


      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={()=>{navigate("ai_input")}}
      >
        <AliwangwangOutlined />
        AI Insights
      </Button>
      
      { (contributor === 'false' && visitor === 'false') && (
        <Menu className=" px-1" mode="inline" >
        <Menu.SubMenu key="setting" icon={<GlobalOutlined/>} title={<span> 
         Sell To Global</span>}>
         <Menu.Item onClick={()=>{navigate(window.location.href ='https://chatgptmall.tech/')}} key="g3" target="_blank"> Sell By Smart Contract</Menu.Item>
         <Menu.Item onClick={()=>{navigate("ether_connect")}} key="g4">Ether Connect</Menu.Item>
       </Menu.SubMenu>
       </Menu>
      )
      }
      
      {visitor === 'false' && 
      (<Menu className=" px-1" mode="inline" >
        <Menu.SubMenu key="global" icon={<GlobalOutlined/>} title={<span>Made In Global</span>}>
        <Menu.Item onClick={()=>{navigate(window.location.href ='https://chatgptapi.store')}} key="g3"> Made By Smart Contract</Menu.Item>
          <Menu.Item onClick={()=>{navigate("global_retailer_handm")}} key="g1">H&M</Menu.Item>
          <Menu.Item onClick={()=>{navigate("global_retailer_taobao/products")}} key="g2">Alibaba B2C</Menu.Item> 
          <Menu.Item onClick={()=>{navigate("global_suplier_search")}} key="g3">Alibaba B2B</Menu.Item>
          <Menu.Item onClick={()=>{navigate("three_sixty")}} key="g4">Generate 360° Image</Menu.Item> 
          <Menu.SubMenu key="talents" icon={<UserOutlined />} title={<span>Talent</span>}>
          <Menu.Item onClick={()=>{navigate("jobs")}} key="ti">linkedin</Menu.Item>
          <Menu.Item onClick={()=>{navigate("upwork-search")}} key="t2">UpWork</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>)}

      <Menu className=" px-1" mode="inline" >
        <Menu.SubMenu key="showroom" icon={<ShopOutlined/>} title={<span>Fab Showroom</span>}>
        <Menu.Item onClick={()=>{navigate("view-items")}} key="s1">Fab Contracts</Menu.Item>
        <Menu.Item onClick={()=>{setUploadItemsModelOpen(true)}} key="s2">Upload Contract</Menu.Item>
        </Menu.SubMenu>
      </Menu>


      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={handleFavClick}
        
      >
        <HeartOutlined />
       Favourites
      </Button>
      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={()=>navigate("stocks")}
      >
        <StockOutlined />
        Stocks
      </Button>
      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={()=>navigate("airbnb")}
      >
        <BuildOutlined />
        Airbnb
      </Button>
    
      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={()=>navigate("currencies")}
      >
        <DollarCircleOutlined/>
        Currencies
      </Button>
      {(visitor === 'false' && contributor === 'false') &&
       <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={()=>{navigate("share-room-access")}}
        >        
       <GlobalOutlined/> 
       Share Fab Access
        </Button>
      }

      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        style={{ color: "white", textAlign: "left" }}
        onClick={handleSupportClick}
      >
        <CustomerServiceOutlined />
        Ask For Support
      </Button>
    </>
  );
}

export default RoomItems;
