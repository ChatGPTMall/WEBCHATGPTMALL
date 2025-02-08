import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Button, Input, Select, Steps, Tag, message, theme, Form, Col, Row, Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm } from 'antd/es/form/Form';
import { redeemCoupon, savePurchaseItem } from '../apiCalls/growthNetwork';
import { payPayment } from '../apiCalls/stripe/payPayment';


function Checkout() {
    const location = useLocation()
    const [form] = useForm()
    const [loading, setLoading] = useState(false)
    const [totalDiscount, setTotalDiscount] = useState({ value: 0, msgType: "success", msgValue: "" })
    const [data, setData] = useState({
        item: location.state,
        address: {

        },
        addressIsValid: false,
        coupon: ""



    })
    const navigate = useNavigate()
    const labelStyle = {
        color: "#6d6b6b",

    }
    const handleRedeem = async () => {
        const coupon = data.coupon
        try {

            const { data } = await redeemCoupon({ coupon_code: coupon })
            setTotalDiscount((prevState) => ({ ...prevState, value: data.discount, msgType: "success", msgValue: "Coupon Applied Successfully" }))

        } catch (error) {
            setTotalDiscount((prevState) => ({ ...prevState, value: 0, msgType: "error", msgValue: "Invalid Coupon Code" }))

        }


    }




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
                    form={form}
                    className='p-5'
                    layout='vertical'
                    onFinish={(value) => { setData((prevState) => ({ ...prevState, address: value, addressIsValid: true })); next() }}
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
            content: <div className='container p-5 '>
                <div className='row'>
                    <div className='col-6 d-flex flex-column '>
                        <h2 style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>Order Summary</h2>
                        <div className='py-3'>
                            <p style={labelStyle} className='d-flex justify-content-between'><span>{data.item.item_details.title}</span><span>${data.item.item_details.price}</span></p>
                            <p style={labelStyle} className='d-flex justify-content-between'><span>Quantity</span><span>1</span></p>
                            <p style={labelStyle} className='d-flex justify-content-between'><span>Shipping Fee</span><span>Free</span></p>
                            <p style={labelStyle} className='d-flex justify-content-between'><span>Total Discount</span><span>${totalDiscount.value}</span></p>

                            <p style={labelStyle} className='d-flex justify-content-between'><span style={{ fontWeight: "bold", color: "black" }}>Total Price</span><span style={{ fontWeight: "bold", color: "black" }}>${data.item.item_details.price - totalDiscount.value}</span></p>


                        </div>
                    </div>
                    <div className='col-6 d-flex px-5  flex-column '>
                        <div className='d-flex flex-column gap-1 '>
                            <h2 className="mb-3" style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>Shipping</h2>
                            <strong style={labelStyle}>{data.item.item_details.name}</strong>
                            <span style={labelStyle}>{data.address.address + "," + data.address.city + "," + data.address.state}</span>
                            <span style={labelStyle}>{data.address.country + "," + data.address.zip}</span>
                            <span style={labelStyle}>{data.address.phone}</span>



                        </div>
                        <div style={{ marginTop: 200 }} className='d-flex  my-4 redeem-coupen-div flex-column w-75  gap-3' >
                            <Input onChange={(e) => setData((prevState) => ({ ...prevState, coupon: e.target.value }))} placeholder='Redeem Coupon Code' size='large' />
                            <span style={{ color: totalDiscount.msgType == "error" ? "red" : "green" }}>{totalDiscount.msgValue}</span>
                            <Button size='large' style={{ background: "#4c58db", color: "white" }} onClick={() => handleRedeem()}>Redeem</Button>

                        </div>

                    </div>
                </div>

            </div>,
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
    const handleCheckout = async () => {
        try {
            setLoading(true)
            const resData = await savePurchaseItem({
                "item": data.item.item_details.id,
                "address": `${data.address?.address},${data.address?.city},${data.address?.state},${data.address?.country},${data.address?.zip}`,
                "phone_no": `${data.address?.phone}`,
            })
            const info = {
                item_id: data.item.item_details.item_id,
                total_price: data.item.item_details.price - totalDiscount.value,
                success_url: `https://homelinked.tech/paymentsuccess/${resData.data.purchase_id}`,
                cancel_url: `https://homelinked.tech/paymentfailed/${resData.data.purchase_id}`,
            }
            const res = await payPayment(info)
            window.location.replace(res.data.url);
            setLoading(false)
        } catch (error) {
            
            setLoading(false)
        }
    }
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
    useEffect(() => {

        setData((prevState) => ({ ...prevState, addressIsValid: false }))

    }, [current])
    return (
        !loading ? <div className='w-100'>
            <Header />
            <div className='p-4 container'>
                <>
                    <Steps current={current} items={items} />
                    <div style={contentStyle}>{steps[current].content}</div>
                    <div style={{ marginTop: 24 }}>
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                <FaArrowLeft />
                            </Button>
                        )}

                        {current < steps.length - 1 && (data.item) && (
                            <Button onClick={() => {
                                if (current == 1) {

                                    form.submit()
                                }
                                return (current !== 1) && next()
                            }}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button size='large' style={{ background: "#4c58db", color: "white" }} onClick={() => handleCheckout()}>
                                Checkout
                            </Button>
                        )}

                    </div>
                </>

            </div>

        </div> :
            <div className='h-[100vh] w-100 d-flex justify-content-center align-items-center'>
                <Spin />
            </div>
    )
}

export default Checkout