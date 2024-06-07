import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import CustomSearch from '../../Components/CustomSearch'
import { saveweChatBot, updateChatBot, getweChatBotList } from './data'
import { Context } from '../../context/contextApi'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Modal, Select, Spin, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import WeChatBots from './components/WeChatBots'
import { supplyChainWithoutAuth } from '../../apiCalls/supplyChain'


function WechatChatBots() {
  const [search, setSearch] = useState("")
  const [chatBotList, setChatBotList] = useState([])
  const [communities,setCommunities]=useState([])
  const navigate = useNavigate()
  const [chatBotListCopy, setChatBotListCopy] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [media, setMedia] = useState({ image: null, pdfFile: null })
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null)
  const {
    user,
  } = useContext(Context);
  const fetchCommunities = async () => {
    setLoading(true)

    try {
      const { data } =await supplyChainWithoutAuth()
      const mData=data.map((com)=>({label:com.name,value:com.community_id}))
      setCommunities(mData)
      setLoading(false)
    } catch (error) {
      setLoading(false)

    }

  }
  const fetchChatBots = async () => {
    try {
      const { data } = await getweChatBotList()
      setChatBotList((prevState) => data)
      setChatBotListCopy((prevState) => data)

    } catch (error) {

    }


  }
  useEffect(() => {
    fetchChatBots()
    if (!localStorage.getItem("token") && !user) {
      navigate("/")
    }
    if(user){

      fetchCommunities()
    }
  }, [user])
  useEffect(() => {
    console.log(editData)
  }, [editData])
  useEffect(() => {
    const regex = new RegExp(search, "i");
    setChatBotListCopy(
      chatBotList?.filter(({ title }) => {
        return title ? regex.test(title) : false;
      })
    );
  }, [search])
  const handleChatBotSave = () => {
    form.submit()
  }
  const onFormSubmit = async (values) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("official_id", values.official_id)
      formData.append("image", media.image)
      if (values.community) {
        formData.append("file", values.community)
      }
      const { data } = editData ? await updateChatBot(formData) : await saveweChatBot(formData)
      form.resetFields()
      setMedia({ image: null, pdfFile: null })
      let temp = chatBotList
      if (editData) {
        temp = temp.filter((bot) => bot.official_id !== editData.official_id)
      }
      temp.unshift(data)
      setChatBotList(() => (temp))
      setChatBotListCopy(() => (temp))
      setShowModel(false)
      setLoading(false)
    } catch (error) {
      setLoading(false)

    }

  }
  const removeBot = (id) => {
    const afterDelete = chatBotList.filter(({ official_id }) => official_id !== id)
    setChatBotList((prevState) => (afterDelete))
    setChatBotListCopy((prevState) => (afterDelete))
  }
  const formItems = () => <Form
    name="myForm"
    disabled={loading}
    form={form}
    style={{ marginTop: 70 }}
    className='mx-2'
    onFinish={onFormSubmit}
    labelCol={{ flex: "150px" }}
    labelAlign='left'
    requiredMark={false}
    initialValues={{
      title: editData?.title || "",
      instructions: editData?.instructions || "",
      description: editData?.description || "",
    }}
  >
    {loading ? <div className='position-absolute' style={{ top: "48%", left: "50%" }}>
      <Spin />
    </div> : <></>}
    <Form.Item
      label="Official ID"
      name="official_id"

      rules={[
        {
          required: true,
          message: 'Please input Official ID!',
        },
      ]}
    >
      <Input placeholder="Enter Official ID" />
    </Form.Item>
    <Form.Item
      label="ChatBot Name"
      name="title"

      rules={[
        {
          required: true,
          message: 'Please input the title!',
        },
      ]}
    >
      <Input placeholder="Enter the title" />
    </Form.Item>

    <Form.Item
      label="Community ID"
      name="community"

      rules={[
        {
          required: false,
          message: 'Please input the Community ID!',
        },
      ]}
    >
      <Select placeholder="Enter the Community ID" mode='multiple' options={communities}>
      </Select>
    </Form.Item>


    <Form.Item
      label="Profile Pic"
      name="image"
      valuePropName="fileList"
      getValueFromEvent={(e) => e && e.fileList}
      rules={[
        {
          required: true,
          message: 'Please upload an image!',
        },
      ]}
    >
      <Upload
        beforeUpload={() => false}
        onChange={({ file }) => setMedia((prevState) => ({ ...prevState, image: file }))}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>{!media.image ? "Select File" : "Uploaded"}</Button>
      </Upload>
    </Form.Item>

    <Form.Item>
    </Form.Item>
  </Form>
  return (
    <div className='w-100'>
      <Header />
      <Modal
        className='chatbot-add-model '
        open={showModel}
        onCancel={() => setShowModel(false)}
        onOk={handleChatBotSave}
        okButtonProps={{ disabled: loading }}
        okText={editData ? "Update Bot" : "Create Bot"}
        closable={false}
      >
        {formItems()}
      </Modal>
      <div className='container-fluid'>
        <div className='d-flex align-items-center pt-4 justify-content-center '>

          <CustomSearch placeholder="ChatBots" setSearch={setSearch} value={search} />
        </div>
        <div className='d-flex flex-wrap justify-content-center   pt-5' >
          <WeChatBots onClickAddChatBot={() => { setShowModel(true); setEditData(null); form.resetFields() }} />
          {
            chatBotListCopy.map((item) => {
              return <WeChatBots onClickAddChatBot={(data) => { setShowModel(true); setEditData(item) }} removeBot={removeBot} official_id={item.official_id} title={item.title} updatedOn={item.updated_at} type={item.type ? item.type : "show"} image={item.image} />
            })
          }
        </div>
      </div>

    </div>
  )
}

export default WechatChatBots
