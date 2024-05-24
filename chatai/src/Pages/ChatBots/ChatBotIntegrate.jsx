import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import ChatBotIntegrateCard from './components/ChatBotIntegrateCard'
import whatsappIcon from "../../assets/whatsapp.png"
import fbIcon from "../../assets/fb.png"
import instagramIcon from "../../assets/instagram.png"
import webIcon from "../../assets/ux.png"
import weChatIcon from "../../assets/wechat.png"
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { integrateWhatsappChatBot } from './data'
import { toast } from "react-toastify";
import { TbClipboardCopy } from "react-icons/tb";


function ChatBotIntegrate() {
    const [openWhatsApp, setOpenWhatsApp] = useState(false)
    const [openWeChat, setOpenWeChat] = useState(false)
    const [formWhatsApp] = Form.useForm()
    const [formWeChat] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [token] = useState("scanpen2024");
    const [serverUrl] = useState("https://chatgptmall.tech/wechat/events/");
    const [encodingAESKey] = useState("E3XZruVasWjvORGRkhgEPCUPOFUJ7keCHKI8qQZ0NwZ");

    const handleIntegrateBotSave = async (values, bot) => {
        try {
            setLoading(true)
            const res = await integrateWhatsappChatBot({ ...values, chatbot: location?.state?.chatbot_id })
            setLoading(false)
            bot === "whatsapp" ? formWhatsApp.resetFields() : formWeChat.resetFields()
            bot === 'whatsapp' ? setOpenWhatsApp(false) : setOpenWeChat(false)
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
            bot === 'whatsapp' ? setOpenWhatsApp(false) : setOpenWeChat(false)

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
    useEffect(() => {
        if (!location?.state?.chatbot_id) {
            navigate("/chatbots")
        }
    }, [location?.state])

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    return (
        <div className='w-100'>
            <Modal open={openWhatsApp}
                className='chatbot-integrate-model chatbot-add-model'
                onCancel={() => setOpenWhatsApp(false)}

                onOk={() => formWhatsApp.submit()}
                okButtonProps={{ disabled: loading }}
                okText={"Integrate Bot"}
                closable={false}
            >
                <Form
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                    colon={false}
                    form={formWhatsApp}
                    className='p-2 py-4'
                    requiredMark={false}
                    // wrapperCol={{ span: 12 }}
                    onFinish={(values) => handleIntegrateBotSave(values, 'whatsapp')}
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
            <Modal open={openWeChat}
                className='chatbot-integrate-model chatbot-add-model'
                onCancel={() => setOpenWeChat(false)}
                // okText={"Submit"}
                closable={false}
            >
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-700">WeChat Configuration</h2>
                        <p className='text-gray-500 text-sm'>
                            Log in to the official website of the Weixin Official Accounts Platform,
                            go to Development &gt; Basic Settings and check the agreement to become a developer.
                            Then click the Modify Configuration button to enter the following details:
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Token</label>
                        <div className="flex items-center">
                            <div className="w-full text-gray-700">
                                {token}
                            </div>
                            <TbClipboardCopy onClick={() => handleCopy(token)} color='black' size={20} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Server Address (URL)</label>
                        <div className="flex items-center">
                            <div className="w-full text-gray-700">
                                {serverUrl}
                            </div>
                            <TbClipboardCopy onClick={() => handleCopy(serverUrl)} color='black' size={20} />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700">EncodingAESKey</label>
                        <div className="flex items-center">
                            <div className="w-full text-gray-700">
                                {encodingAESKey}
                            </div>
                            <TbClipboardCopy onClick={() => handleCopy(encodingAESKey)} color='black' size={20} />
                        </div>
                    </div>
                </div>


            </Modal>

            <Header />
            <div className=' px-5 py-2  container'>
                <Button type='link' onClick={() => navigate(-1)}>
                    <ArrowLeftOutlined />
                </Button>
            </div>

            <div className=' py-2 px-5 container d-flex flex-wrap justify-content-center gap-4'>
                <ChatBotIntegrateCard icon={whatsappIcon} title={"Whatsapp Business"} onSetupClick={() => { setOpenWhatsApp(true) }} />
                <ChatBotIntegrateCard icon={fbIcon} title={"FaceBook"} onSetupClick={() => { }} />
                <ChatBotIntegrateCard icon={instagramIcon} title={"Instagram"} onSetupClick={() => { }} />
                <ChatBotIntegrateCard icon={webIcon} title={"Integrate in Website"} onSetupClick={() => { }} />
                <ChatBotIntegrateCard icon={weChatIcon} title={"Integrate With Wechat"} onSetupClick={() => { setOpenWeChat(true) }} />

            </div>
        </div>

    )
}

export default ChatBotIntegrate