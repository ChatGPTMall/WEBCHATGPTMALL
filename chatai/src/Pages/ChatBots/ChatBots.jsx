import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import CustomSearch from '../../Components/CustomSearch'
import ChatbotCard from './components/ChatbotCard'
import { getChatBotList, saveChatBot, updateChatBot } from './data'
import { Context } from '../../context/contextApi'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Modal, Spin, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
function ChatBots() {
  const [search, setSearch] = useState("")
  const [chatBotList, setChatBotList] = useState([])
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
  const fetchChatBots = async () => {
    try {
      const { data } = await getChatBotList()
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
      formData.append("description", values.description)
      formData.append("instructions", values.instructions)
      formData.append("image", media.image)
      if (media.pdfFile) {
        formData.append("file", media.pdfFile)
      }
      const params = {
        chatbot_id: editData?.chatbot_id
      }
      const { data } = editData ? await updateChatBot(formData, params) : await saveChatBot(formData)
      form.resetFields()
      setMedia({ image: null, pdfFile: null })
      let temp = chatBotList
      if (editData) {
        temp = temp.filter((bot) => bot.chatbot_id !== editData.chatbot_id)
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
    const afterDelete = chatBotList.filter(({ chatbot_id }) => chatbot_id !== id)
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
      label="Instructions"
      name="instructions"

      rules={[
        {
          required: true,
          message: 'Please input the instructions!',
        },
      ]}
    >
      <Input.TextArea disabled={editData} placeholder="Enter instructions" />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input the description!',
        },
      ]}
    >
      <Input.TextArea placeholder="Enter description" />
    </Form.Item>

    <Form.Item
      label="Training Data (.pdf)"
      name="file"
      valuePropName="fileList"
      getValueFromEvent={(e) => e && e.fileList}
      rules={[
        {
          required: editData ? false : true,
          message: 'Please upload a file!',
        },
      ]}
    >
      <Upload
        accept='.pdf'
        beforeUpload={() => false}
        onChange={({ file }) => setMedia((prevState) => ({ ...prevState, pdfFile: file }))}
        showUploadList={false}
      >
        {<Button disabled={editData} icon={<UploadOutlined />}>{!media.pdfFile ? "Select File" : "Uploaded"}</Button>}
      </Upload>
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
          <ChatbotCard onClickAddChatBot={() => { setShowModel(true); setEditData(null); form.resetFields() }} />
          {
            chatBotListCopy.map((item) => {
              return <ChatbotCard onClickAddChatBot={(data) => { setShowModel(true); setEditData(item) }} removeBot={removeBot} chatbot_id={item.chatbot_id} title={item.title} description={item.description} updatedOn={item.updated_at} type={item.type ? item.type : "show"} image={item.image} />
            })
          }
        </div>
      </div>

    </div>
  )
}

export default ChatBots