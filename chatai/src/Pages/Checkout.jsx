import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Button, Input, Select, Steps, Tag, message, theme, Form, Col, Row } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


function Checkout() {
    const location = useLocation()
    const navigate = useNavigate()
    const steps = [
        {
            title: `${location.state.item_details.title} Details`,
            content: <div className='position-relative' >
                <div className='d-flex  justify-content-between align-items-center'>
                    <div className='d-flex w-100 me-4 my-2 justify-content-between align-items-center'>
                        <span className="card-title my-1 mt-2 font-bold" >{location.state.item_details.title}</span>

                        <Tag color="processing">${location.state.item_details.price}</Tag>
                    </div>
                </div>
                <span className="card-text py-2 " style={{ whiteSpace: "pre-line" }}>{location.state.item_details.description}</span>
                <div className='flex justify-content-between align-items-center'>
                </div>
                <div className='d-flex mt-2 py-3' >
                    <img style={{ height: 250, objectFit: "contain" }} src={location.state.item_details.image} className="card-img-top" alt="img..." />
                    <video width="600" style={{ height: 250 }} controls>
                        <source src={location.state.item_details.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                </div>

            </div>

        },
        {
            title: 'Shipping address',
            content: <div className='pt-5'>
                <Form
                    labelCol={{ span: 20 }}
                    className='p-5'
                    layout='vertical'
                    onFinish={() => { }}
                >
                    <Row gutter={24}>
                        {/* Address */}
                        <Col span={12}>
                            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address' }]}>
                                <Input size='large' />
                            </Form.Item>
                        </Col>

                        {/* Phone Number */}
                        <Col span={12}>
                            <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                                <Input size='large' />
                            </Form.Item>
                        </Col>


                        {/* City */}
                        <Col span={12}>
                            <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter your city' }]}>
                                <Input size='large' />
                            </Form.Item>
                        </Col>

                        {/* Zip Code */}
                        <Col span={12}>
                            <Form.Item label="Zip Code" name="zip" rules={[{ required: true, message: 'Please enter your zip code' }]}>
                                <Input size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please select your state' }]}>
                                <Input size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please select your state' }]}>
                                <Input size='large' />
                            </Form.Item>
                        </Col>
                    </Row>        
                </Form>
            </div>,
        },
        {
            title: 'Checkout',
            content: 'Checkout',
        },
    ];

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((state) => ({ key: state.title, title: state.title }));

    const contentStyle = {
        padding: 10,
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
        minHeight: 500
    };
    useEffect(() => {
        if (!location.state) {

            navigate("/")
        }
    }, [location.state])
    return (
        <div className='w-100'>
            <Header />
            <div className='p-4 container'>
                <>
                    <Steps current={current} items={items} />
                    <div style={contentStyle}>{steps[current].content}</div>
                    <div style={{ marginTop: 24 }}>
                    {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                <FaArrowLeft/>
                            </Button>
                        )}
                       
                        {current < steps.length - 1 && (
                            <Button onClick={() => next()}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button onClick={() => message.success('Purchase completed!')}>
                                Checkout
                            </Button>
                        )}
                        
                    </div>
                </>

            </div>

        </div>
    )
}

export default Checkout