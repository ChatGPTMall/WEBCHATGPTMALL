import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import ChatBotIntegrateCard from './components/ChatBotIntegrateCard'
import whatsappIcon from "../../assets/whatsapp.png"
import fbIcon from "../../assets/fb.png"
import instagramIcon from "../../assets/instagram.png"
import webIcon from "../../assets/ux.png"
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'
import { integrateWhatsappChatBot } from './data'
import { toast } from "react-toastify";


function ChatBotIntegrate() {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()
    const location=useLocation()
    const handleIntegrateBotSave = async (values) => {
        try {
            setLoading(true)
            const res = await integrateWhatsappChatBot({...values,chatbot:location?.state?.chatbot_id})
            setLoading(false)
            form.resetFields()
            setOpen(false)
            toast.success(res.data?.msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });

            
        } catch (error) {
            setLoading(false)
            setOpen(false)

            toast.error(error.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
        }
    }
    useEffect(()=>{
        if(!location?.state?.chatbot_id){
            navigate("/chatbots")
        }
    },[location?.state])
    return (
        <div className='w-100'>
            <Modal open={open}
                className='chatbot-integrate-model chatbot-add-model'
                onCancel={() => setOpen(false)}

                onOk={() => form.submit()}
                  okButtonProps={{disabled:loading}}
                okText={"Integrate Bot"}
                closable={false}
            >
                <Form
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                    colon={false}
                    form={form}
                    className='p-2 py-4'
                    requiredMark={false}
                    // wrapperCol={{ span: 12 }}
                    onFinish={handleIntegrateBotSave}
                >
                   

                    <Form.Item
                        label="Phone Number"
                        name="phone_no"
                        rules={[{ required: true, message: 'Please enter the phone number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number ID"
                        name="phone_no_id"
                        rules={[{ required: true, message: 'Please enter the phone number ID!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Access Token"
                        name="access_token"
                        rules={[{ required: true, message: 'Please enter the access token!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="App ID"
                        name="app_id"
                        rules={[{ required: true, message: 'Please enter the app ID!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="App Secret"
                        name="app_secret"
                        rules={[{ required: true, message: 'Please enter the app secret!' }]}
                    >
                        <Input />
                    </Form.Item>


                </Form>

            </Modal>
            <Header />
            <div className=' px-5 py-2  container'>
                <Button type='link' onClick={() => navigate(-1)}>
                    <ArrowLeftOutlined />
                </Button>
            </div>

            <div className=' py-2 px-5 container d-flex flex-wrap justify-content-center gap-4'>
                <ChatBotIntegrateCard icon={whatsappIcon} title={"Whatsapp Business"} onSetupClick={() => { setOpen(true) }} />
                <ChatBotIntegrateCard icon={fbIcon} title={"FaceBook"} onSetupClick={() => { }} />
                <ChatBotIntegrateCard icon={instagramIcon} title={"Instagram"} onSetupClick={() => { }} />
                <ChatBotIntegrateCard icon={webIcon} title={"Integrate in Website"} onSetupClick={() => { }} />

            </div>
        </div>

    )
}

export default ChatBotIntegrate