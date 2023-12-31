import { DeleteOutlined, DeleteTwoTone, EditOutlined, EditTwoTone, MoreOutlined, PlusCircleTwoTone, SettingOutlined, SettingTwoTone } from '@ant-design/icons';
import { Button, Dropdown, Popover } from 'antd'
import React from 'react'
import "../../style.scss"
import dayjs from 'dayjs';

function ChatbotCard({ type, title, description, updatedOn }) {
    const content = (
        <div>
            <p className='my-2 text-sm d-flex align-items-center'> <EditTwoTone /><span className='m-0 ms-2'>Edit</span> </p>
            <p className='my-3 text-sm d-flex align-items-center'><SettingTwoTone /><span className='m-0 ms-2'>Train ChatBot</span> </p>

            <p className='my-2 text-sm d-flex align-items-center'><DeleteTwoTone /><span className='m-0 ms-2'>Delete</span> </p>
        </div>
    );
    return (
        type == "show" && title ?
            <div className="w-full chatbot-card m-2 max-w-sm bg-white  rounded-lg   p-2">
                <div className="flex justify-end  pt-2">
                    <Popover placement="bottom" title={""} content={content} >
                        <MoreOutlined style={{fontSize:20}} />
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
            </div> : <div className="w-full  chatbot-card-add m-2 max-w-sm   rounded-lg   p-2">
                <div className="flex h-100 justify-content-center align-items-center flex-col p-2 " >
                    <PlusCircleTwoTone style={{ fontSize: 50 }} />
                    <h2 className='text-md mt-2 text-white font-semibold'>Add ChatBot</h2>

                </div>
            </div>

    )
}

export default ChatbotCard
ChatbotCard.defaultProps = {
    type: "show"
}