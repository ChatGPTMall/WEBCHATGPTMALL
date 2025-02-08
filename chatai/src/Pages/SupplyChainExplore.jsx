import React, { useEffect, useMemo, useState } from 'react'
import Header from '../Components/Header'
import { Link, useParams } from 'react-router-dom'
import { getCatAndBanks, getNetworkGrowthItems, uploadCapability } from '../apiCalls/growthNetwork'
import ExploreProductCard from '../Components/ExploreProductCard'
import { Button, Col, Drawer, Form, Input, Row, Segmented, Select, Upload, DatePicker } from 'antd'
import { UploadOutlined, CopyOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { Context } from '../context/contextApi'
import { toast } from "react-toastify";
import { createCoupon, supplyChainWithoutAuth, createBulkCoupon } from '../apiCalls/supplyChain'
const { Option } = Select;

function SupplyChainExplore() {
    const [items, setItems] = useState([])
    const [catAndBanks, setCatAndBanks] = useState({})
    const [selectedBank, setSelectedBank] = useState(undefined)
    const [media, setMedia] = useState({ image: null, video: null })
    const [loading, setLoading] = useState(false)
    const [buyOrSell, setSellOrBuy] = useState("sell")
    const param = useParams()
    const [open, setOpen] = useState(false);
    const [cOpen, setcOpen] = useState(false);
    const [bulkOpen, setBulkOpen] = useState(false);
    const [currentCommunity, setCurrentCommunity] = useState({})
    const params = useParams();

    const onCopyClick = async () => {
        try {
            const link = `https://homelinked.tech/supplychain/${params.id}`
            await navigator.clipboard.writeText(link);
            toast.success("Link Copied", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (err) {
            toast.success("Something Went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    const {
        user
    } = useContext(Context);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const handleFormSumbit = async (value) => {
        try {
            if (value.public_bank == "mybank") {
                delete value.public_bank
            }
            setLoading(true)
            value = { ...value, buy_or_sell: buyOrSell }
            const formData = new FormData()
            Object.keys(value).map((key) => {
                if (key !== "image" && key !== "video") {

                    formData.append(key, value[key])
                }
                else {
                    if (media[key]) {
                        formData.append(key, media[key])
                    }
                }
            })
            const params = {
                community_id: param.id
            }
            await uploadCapability(formData, params)
            await fetchItems()
            setLoading(false)
            setOpen(false)
        } catch (error) {
            setLoading(false)

        }
    }
    async function fetchItems() {
        try {
            const { data } = await getNetworkGrowthItems(param.id)
            setItems(data)
        } catch (error) {

        }

    }
    async function fetchCatAndBanks() {
        try {
            const { data } = await getCatAndBanks()
            setCatAndBanks({ ...data, banks: [{ name: "Use My Bank", id: "mybank" }, ...data?.banks] })
        } catch (error) {

        }

    }
    useEffect(() => {
        (async () => {
            const communities = await supplyChainWithoutAuth()
            const current = communities.data.find(({ community_id }) => community_id === params.id)
            setCurrentCommunity(current)
        })()
    }, [params?.id])

    const handleCouponSave = async (data) => {
        try {
            await createCoupon({ ...data, community_name: currentCommunity?.name })
            setcOpen(false)
            toast.success("Coupon added successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        } catch (error) {
            setcOpen(false)
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handleBulkCouponSave = async (data) => {
        try {
            await createBulkCoupon({ ...data, community_name: currentCommunity?.name })
            setBulkOpen(false)
            toast.success("Coupons added successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        } catch (error) {
            setBulkOpen(false)
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
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
        fetchItems()
        fetchCatAndBanks()
    }, [])
    return (
        <div className='explore w-100'>
            <Drawer zIndex={100000000} width={"30%"} title={"Bulk Create Coupons"} open={bulkOpen} onClose={() => setBulkOpen(false)} >
                <Form onFinish={handleBulkCouponSave}>
                    <Form.Item label={"Total Coupons"}
                        rules={[{ required: true, message: "Number of coupons to create" }]}
                        name="total_coupons">

                        <Input type='number'></Input>
                    </Form.Item>
                    <Form.Item label={"Price"}
                        rules={[{ required: true, message: "Please enter price for coupons" }]}
                        name="price">

                        <Input type='number'></Input>
                    </Form.Item>
                    <Form.Item
                        style={{ color: "#282525 !important" }}
                        label="Start Date"
                        name="start_date"
                        rules={[{ required: true, message: "Please select a start date" }]}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        />
                    </Form.Item>

                    <Form.Item
                        label="End Date"
                        name="end_date"
                        dependencies={['startDate']}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Currency"
                        name="currency"
                        rules={[{ required: true, message: "Please select a currency" }]}
                    >
                        <Select
                            placeholder="Select a currency"
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}  // Force popup into document.body
                        >
                            <Option value="INR">INR - Indian Rupee</Option>
                            <Option value="CNY">CNY - Chinese Yuan</Option>
                            <Option value="HKD">HKD - Hong Kong Dollar</Option>
                            <Option value="USD">USD - US Dollar</Option>
                            <Option value="EUR">EUR - Euro</Option>
                            <Option value="GBP">GBP - British Pound</Option>
                            <Option value="JPY">JPY - Japanese Yen</Option>
                            <Option value="AUD">AUD - Australian Dollar</Option>
                        </Select>
                    </Form.Item>
                    <div className='d-flex justify-content-end'>

                        <Button className='ms-auto' htmlType='submit'>Save Coupon</Button>
                    </div>
                </Form>
            </Drawer>
            <Drawer zIndex={100000000} title={"Create New Coupon"} open={cOpen} onClose={() => setcOpen(false)} >
                <Form onFinish={handleCouponSave}>
                    <Form.Item label={"Code"}
                        rules={[{ required: true, message: "Please enter code" }]}
                        name="code">

                        <Input></Input>
                    </Form.Item>
                    <Form.Item label={"Price"}
                        rules={[{ required: true, message: "Please enter price" }]}
                        name="price">

                        <Input type='number'></Input>
                    </Form.Item>
                    <Form.Item
                        style={{ color: "#282525 !important" }}
                        label="Start Date"
                        name="start_date"
                        rules={[{ required: true, message: "Please select a start date" }]}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        />
                    </Form.Item>

                    <Form.Item
                        label="End Date"
                        name="end_date"
                        dependencies={['startDate']}
                    // rules={[
                    //     { required: true, message: "Please select an end date" },
                    //     // Custom validator that compares the end date to the start date
                    //     ({ getFieldValue }) => ({
                    //         validator(_, value) {
                    //             const startDate = getFieldValue('startDate');
                    //             if (!startDate || !value || value.isSameOrAfter(startDate)) {
                    //                 return Promise.resolve();
                    //             }
                    //             return Promise.reject(new Error('End date must be greater than start date'));
                    //         },
                    //     }),
                    // ]}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Currency"
                        name="currency"
                        rules={[{ required: true, message: "Please select a currency" }]}
                    >
                        <Select
                            placeholder="Select a currency"
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}  // Force popup into document.body
                        >
                            <Option value="INR">INR - Indian Rupee</Option>
                            <Option value="CNY">CNY - Chinese Yuan</Option>
                            <Option value="HKD">HKD - Hong Kong Dollar</Option>
                            <Option value="USD">USD - US Dollar</Option>
                            <Option value="EUR">EUR - Euro</Option>
                            <Option value="GBP">GBP - British Pound</Option>
                            <Option value="JPY">JPY - Japanese Yen</Option>
                            <Option value="AUD">AUD - Australian Dollar</Option>
                        </Select>
                    </Form.Item>
                    <div className='d-flex justify-content-end'>

                        <Button className='ms-auto' htmlType='submit'>Save Coupon</Button>
                    </div>
                </Form>
            </Drawer>
            <Drawer width={"60%"} title={<div className='d-flex justify-content-end' >

                <Col className="segmented-button-container m-0">
                    <Form.Item initialValue={buyOrSell} name={"sell_or_buy"} className='m-0'>
                        <Segmented
                            onChange={(value) => { setSellOrBuy(value) }}
                            options={[
                                {
                                    label: "Sell", value: "sell",

                                },
                                {
                                    label: "Buy", value: "buy",

                                },]}></Segmented>
                    </Form.Item>
                </Col>
            </div>} placement="right" onClose={onClose} open={open}
            >
                <Form
                    layout='vertical'
                    onFinish={handleFormSumbit}

                >
                    <Row className='d-flex justify-content-between' gutter={20}>

                        <Col span={12} >

                            <Form.Item label={"Capability Name"}
                                rules={[{ required: true, message: "Please Select Capability Name" }]}
                                name="title">

                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12} >

                            <Form.Item name="category" label={"Capability Category"}

                                rules={[{ required: true, message: "Please Select Capability Category" }]}
                            >

                                <Select className='w-100' options={catAndBanks?.categories?.map((cat) => {
                                    return { label: cat.title, value: cat.id }
                                })}></Select>
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item name={"description"} label="Capability Description"
                                rules={[{ required: true, message: "Capability description is required" }]}

                            >

                                <textarea className="form-control" rows="8" id="inputAddress" placeholder="Item Description"></textarea>
                            </Form.Item>


                        </Col>
                        <Col span={8} >
                            <Form.Item name={"image"} label={"Capability Image"}
                                rules={[{ required: true, message: "Capability image is required" }]}

                            >
                                <Upload
                                    beforeUpload={() => false}
                                    onChange={({ file }) => setMedia((prevState) => ({ ...prevState, image: file }))}
                                    showUploadList={false}
                                >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item name="video" label="Capability Video(Optional)">
                                <Upload
                                    beforeUpload={() => false}
                                    onChange={({ file }) => setMedia((prevState) => ({ ...prevState, video: file }))}
                                    showUploadList={false}
                                >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </Upload>


                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item name="item_type" label="Select Capability Type"
                                rules={[{ required: true, message: "Please select capability type " }]}

                            >
                                <Select options={[
                                    { label: "Physical", value: "PHYSICAL" },
                                    { label: "Digital", value: "DIGITAL" },
                                    { label: "Service", value: "SERVICE" },


                                ]}
                                    placeholder="Choose..."
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12} >

                            <Form.Item name="price" label="Price"
                                rules={[{ required: true, message: "Capability price is required" }]}

                            >
                                <Input type='number'></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item name="stock" label="Stock"
                                rules={[{ required: true, message: "Capability stock is required" }]}

                            >
                                <Input type='number'></Input>
                            </Form.Item>
                        </Col>

                        <Col span={12} >
                            <Form.Item name="location" label="Location"
                                rules={[{ required: true, message: "Capability location is required" }]}

                            >
                                <Input type='text'></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item name={"public_bank"} label="Select Bank"
                                rules={[{ required: true, message: "Please select bank" }]}

                            >
                                <Select
                                    value={selectedBank}
                                    onChange={(value) => setSelectedBank(value)}
                                    options={catAndBanks?.banks?.map((bank) => {

                                        return { label: bank?.name, value: bank.id }
                                    })
                                    }>

                                </Select>
                            </Form.Item>

                        </Col>
                        {/* kjfhsk */}
                        {selectedBank === "mybank" &&
                            <>

                                <Col span={12} >
                                    <Form.Item name={"stripe_private_key"}
                                        label={<span>Stripe Private Key (<Link to="/stripe/documentation">Click Here</Link>)</span>}
                                        rules={[{ required: true, message: "Please input stripe private key" }]}

                                    >

                                        <Input />

                                    </Form.Item>

                                </Col>
                                <Col span={12} >
                                    <Form.Item name={"stripe_public_key"}
                                        label={<span>Stripe Public Key (<Link to="/stripe/documentation">Click Here</Link>)</span>}

                                        rules={[{ required: true, message: "Please input stripe public key" }]}

                                    >

                                        <Input />

                                    </Form.Item>

                                </Col>
                                <Col span={12} >
                                    <Form.Item name={"stripe_webhook_key"}
                                        label={<span>Stripe Webhook Key (<Link to="/stripe/documentation">Click Here</Link>)</span>}

                                        rules={[{ required: false, message: "" }]}

                                    >

                                        <Input />

                                    </Form.Item>

                                </Col>
                            </>
                        }
                    </Row>


                    <Col>

                        <Button loading={loading} htmlType='submit'>Upload Capability</Button>
                    </Col>
                </Form>
            </Drawer>
            <div className=' w-100 overflow-y-scroll ' style={{ background: "#343541" }}>

                <div style={{ background: "white", zIndex: 10000 }}>

                    {user && <Button style={{ position: "fixed", top: 100, left: 20, color: "white" }} onClick={() => onCopyClick()} >Share Network<CopyOutlined /></Button>}
                    <div className='d-flex gap-2 flex-column' style={{ zIndex: 10, position: "fixed", top: 100, right: 20, color: "white" }}>

                        {user && <Button style={{ color: "white" }} onClick={() => setOpen(true)}>Upload Capability</Button>}
                        {user && <Button style={{ color: "white" }} onClick={() => setcOpen(true)}>Create Coupon</Button>}
                        {user && <Button style={{ color: "white" }} onClick={() => setBulkOpen(true)}>Bulk Create Coupons</Button>}
                    </div>
                </div>

                <Header />
                <div className='container position-relative flex-column my-5 pt-3 gap-4 h-[90vh] flex items-center scrollbar-none'>
                    <div style={{ color: "white", textAlign: "center" }}>
                        <p>
                            {currentCommunity?.name}

                        </p>
                        <p className='my-1'>
                            {currentCommunity?.slogan}

                        </p>
                    </div>
                    {
                        items?.map((item, index) => {
                            return <ExploreProductCard key={item.item_id} item={item} />
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default SupplyChainExplore