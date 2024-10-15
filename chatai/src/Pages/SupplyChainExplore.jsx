import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link, useParams } from 'react-router-dom'
import { getCatAndBanks, getNetworkGrowthItems, uploadCapability } from '../apiCalls/growthNetwork'
import ExploreProductCard from '../Components/ExploreProductCard'
import { Button, Col, Drawer, Form, Input, Row, Segmented, Select, Upload } from 'antd'
import { UploadOutlined, CopyOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { Context } from '../context/contextApi'
import { toast } from "react-toastify";

function SupplyChainExplore() {
    const [items, setItems] = useState([])
    const [catAndBanks, setCatAndBanks] = useState({})
    const [selectedBank, setSelectedBank] = useState(undefined)
    const [media, setMedia] = useState({ image: null, video: null })
    const [loading, setLoading] = useState(false)
    const [buyOrSell,setSellOrBuy]=useState("sell")
    const param = useParams()
    const [open, setOpen] = useState(false);
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
            value={...value,buy_or_sell:buyOrSell}
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
        fetchItems()
        fetchCatAndBanks()
    }, [])
    return (
        <div className='explore w-100'>

            <Drawer width={"60%"} title={<div className='d-flex justify-content-end' >

                <Col className="segmented-button-container m-0">
                    <Form.Item initialValue={buyOrSell} name={"sell_or_buy"} className='m-0'>
                        <Segmented 
                        onChange={(value)=>{setSellOrBuy(value)}}
                        options={[
                            {
                                label: "Sell", value: "sell",
    
                            },
                            {
                            label: "Buy", value: "buy",

                        }, ]}></Segmented>
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
                {user && <Button style={{ position: "fixed", top: 100, Left: 20, color: "black" }} onClick={() => onCopyClick()} >Share Network<CopyOutlined /></Button>}
                {user && <Button style={{ position: "fixed", top: 100, right: 20, color: "black" }} onClick={() => setOpen(true)}>Upload Capability</Button>}
                <Header />

                <div className='container position-relative flex-column my-5 gap-4 h-[90vh] flex items-center scrollbar-none'>
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