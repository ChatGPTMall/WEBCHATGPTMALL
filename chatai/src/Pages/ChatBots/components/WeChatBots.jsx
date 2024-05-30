import {
    DeleteOutlined,
    DeleteTwoTone,
    EditOutlined,
    EditTwoTone,
    MoreOutlined,
    PlusCircleTwoTone,
    SettingOutlined,
    SettingTwoTone,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Modal, Popover, Segmented, Switch } from "antd";
import React, { useState } from "react";
import "../../style.scss";
import dayjs from "dayjs";
import { deleteWeChatBot } from "../data";
// import { useNavigate } from "react-router-dom";

function WeChatBots({
    removeBot,
    official_id,
    type,
    title,
    updatedOn,
    onClickAddChatBot,
    image
}) {
    // const navigate = useNavigate();
    const deleteBot = async (id) => {
        try {
            const res = await deleteWeChatBot({ official_id: id });
            removeBot(id);
        } catch (error) { }
    };

    // const formItems = () => <Form
    //     name="myForm"
    //     disabled={loading}
    //     form={form}
    //     style={{ marginTop: 70 }}
    //     className='mx-2'
    //     onFinish={onFormSubmit}
    //     labelCol={{ flex: "150px" }}
    //     labelAlign='left'
    //     requiredMark={false}
    //     initialValues={{
    //         app_id: editData?.app_id || "",
    //         secret_id: editData?.secret_id || "",
    //     }}
    // >
    //     {loading ? <div className='position-absolute' style={{ top: "48%", left: "50%" }}>
    //         <Spin />
    //     </div> : <></>}
    //     <Form.Item
    //         label="APP ID"
    //         name="app_id"

    //         rules={[
    //             {
    //                 required: true,
    //                 message: 'Please input APP ID!',
    //             },
    //         ]}
    //     >
    //         <Input placeholder="Enter APP ID" />
    //     </Form.Item>
    //     <Form.Item
    //         label="Secret ID"
    //         name="secret_id"

    //         rules={[
    //             {
    //                 required: true,
    //                 message: 'Please input Secret ID!',
    //             },
    //         ]}
    //     >
    //         <Input placeholder="Enter Secret ID" />
    //     </Form.Item>

    //     <Form.Item>
    //     </Form.Item>
    // </Form>

    const content = (
        <div>
            
            {/* <p
                onClick={onClickAddChatBot}
                style={{ cursor: "pointer" }}
                className="my-2 text-sm d-flex align-items-center"
            >
                {" "}
                <EditTwoTone />
                <span className="m-0 ms-2">Edit</span>{" "}
            </p> */}
            <p
                // onClick={() =>
                //     navigate("/chatbots/integrate", { state: { chatbot_id } })
                // }
                style={{ cursor: "pointer" }}
                className="my-3 text-sm d-flex align-items-center"
            >
                <SettingTwoTone />
                <span className="m-0 ms-2">Configure</span>{" "}
            </p>
            <p
                style={{ cursor: "pointer" }}
                onClick={() => deleteBot(official_id)}
                className="my-2 text-sm d-flex align-items-center"
            >
                <DeleteTwoTone />
                <span className="m-0 ms-2">Delete</span>{" "}
            </p>
        </div>
    );
    return (
        <>
            {type == "show" && title ? (
                <div className="w-full chatbot-card m-2 max-w-sm bg-white  rounded-lg   p-2">
                    <div className="flex justify-end  pt-2">
                        <Col className="segmented-button-container m-0">
                            <Segmented
                                className="m-0"
                                size="small"
                                options={[
                                    {
                                        label: "ON",
                                        value: "on",
                                    },
                                    {
                                        label: "OFF",
                                        value: "off",
                                    },
                                ]}
                            ></Segmented>
                        </Col>
                        <Popover placement="bottom" title={""} content={content}>
                            <MoreOutlined style={{ fontSize: 20 }} />
                        </Popover>
                    </div>
                    <div className="flex flex-col p-2 pb-10 position-relative ">
                        <div className="image-wrapper overflow-hidden ">
                            {image && (
                                <img
                                    src={image}
                                    className="object-cover object-center h-full w-full"
                                    style={{ height: "80px", borderRadius: "50%", width: "80px", position: "absolute", top: "-26px" }}
                                />
                            )}
                        </div>
                        <div style={{ position: "absolute", bottom: "-80px" }}>
                            <h2 className="text-md text-xl font-semibold">{title}</h2>
                            {/* <p className='text-sm my-2'>{description}</p> */}
                        </div>

                        <div
                        >
                            <span className="absolute right-2 text-sm text-gray-500 " style={{ top: "120px" }} >
                                <span className="text-blue" style={{ color: "gray" }}>
                                    Modified On :{" "}
                                </span>{" "}
                                {dayjs(updatedOn).format("DD,MMM,YY")}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    onClick={onClickAddChatBot}
                    className="w-full  chatbot-card-add m-2 max-w-sm   rounded-lg   p-2"
                >
                    <div className="flex h-100 justify-content-center align-items-center flex-col p-2 ">
                        <PlusCircleTwoTone style={{ fontSize: 50 }} />
                        <h2 className="text-md mt-2 text-white font-semibold">
                            Add ChatBot
                        </h2>
                    </div>
                </div>
            )}
        </>
    );
}

export default WeChatBots
WeChatBots.defaultProps = {
    type: "show",
};