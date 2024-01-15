import { DeleteOutlined, DeleteTwoTone, EditOutlined, EditTwoTone, MoreOutlined, PlusCircleTwoTone, SettingOutlined, SettingTwoTone } from '@ant-design/icons';
import { Button, Col, Dropdown, Modal, Popover, Segmented, Switch } from 'antd'
import React, { useState } from 'react'
import "../../style.scss"
import dayjs from 'dayjs';
import { deleteChatBot } from '../data';
import { useNavigate } from 'react-router-dom';

function ChatbotCard({ removeBot, chatbot_id, type, title, description, updatedOn, onClickAddChatBot }) {
    const navigate = useNavigate()
    const deleteBot = async (id) => {
        try {
            const res = await deleteChatBot({ chatbot_id: id })
            removeBot(id)

        } catch (error) {

        }

    }

    const content = (
        <div>
            <p onClick={onClickAddChatBot} style={{ cursor: "pointer" }} className='my-2 text-sm d-flex align-items-center'> <EditTwoTone /><span className='m-0 ms-2'>Edit</span> </p>
            <p onClick={() => navigate("/chatbots/integrate", { state: { chatbot_id } })} style={{ cursor: "pointer" }} className='my-3 text-sm d-flex align-items-center'><SettingTwoTone /><span className='m-0 ms-2'>Integrate</span> </p>
            <p style={{ cursor: "pointer" }} onClick={() => deleteBot(chatbot_id)} className='my-2 text-sm d-flex align-items-center'><DeleteTwoTone /><span className='m-0 ms-2'>Delete</span> </p>
        </div>
    );
    return (
        <>
            {type == "show" && title ?
                <div className="w-full chatbot-card m-2 max-w-sm bg-white  rounded-lg   p-2">
                    <div className="flex justify-end  pt-2">
                        <Col className="segmented-button-container m-0">

                            <Segmented 
                            className='m-0'
                            size='small'
                            options={[{
                                label: "ON", value: "on",

                            }, {
                                label: "OFF", value: "off",

                            }]}></Segmented>
                        </Col>
                        <Popover placement="bottom" title={""} content={content} >
                            <MoreOutlined style={{ fontSize: 20 }} />
                        </Popover>

                    </div>
                    <div className="flex flex-col p-2 pb-10 position-relative">
                        <div>

                            <h2 className='text-md text-xl font-semibold'>{title}</h2>
                            {/* <p className='text-sm my-2'>{description}</p> */}
                        </div>
                        <div className='position-absolute d-flex ' style={{ top: 130, right: 10 }}>
                            <span className='text-sm my-1 ms-auto '><span className="text-blue" style={{ color: "gray" }}>Modified On : </span> {dayjs(updatedOn).format("DD,MMM,YY")}</span>

                        </div>

                    </div>
                </div> : <div onClick={onClickAddChatBot} className="w-full  chatbot-card-add m-2 max-w-sm   rounded-lg   p-2">
                    <div className="flex h-100 justify-content-center align-items-center flex-col p-2 " >
                        <PlusCircleTwoTone style={{ fontSize: 50 }} />
                        <h2 className='text-md mt-2 text-white font-semibold'>Add ChatBot</h2>

                    </div>
                </div>}

        </>
    )
}

export default ChatbotCard
ChatbotCard.defaultProps = {
    type: "show"
}