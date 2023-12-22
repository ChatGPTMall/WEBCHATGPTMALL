import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link, useParams } from 'react-router-dom'
import { getCatAndBanks, getNetworkGrowthItems, uploadCapability, uploadWithNIDCapability } from '../apiCalls/growthNetwork'
import ExploreProductCard from '../Components/ExploreProductCard'
import { Button, Col, Drawer, Form, Input, Row, Select, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FaPaperclip } from 'react-icons/fa'
import { UploadOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { Context } from '../context/contextApi'

function SupplyChainExplore() {
    const [items, setItems] = useState([])
    const [catAndBanks, setCatAndBanks] = useState({})
    const [media, setMedia] = useState({ image: null, video: null })
    const [loading, setLoading] = useState(false)
    const param = useParams()
    const [open, setOpen] = useState(false);
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
            setLoading(true)
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
        setCatAndBanks(data)
    } catch (error) {
            
    }

    }
    useEffect(() => {
        fetchItems()
        fetchCatAndBanks()
    }, [])
    return (
        <div className='explore w-100'>
            <Drawer width={"60%"} title="Upload" placement="right" onClose={onClose} open={open}
            >
                <Form
                    layout='vertical'
                    onFinish={handleFormSumbit}
                ><Row className='d-flex justify-content-between' gutter={20}>

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

                        <Col span={ 12} >
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
                                <Select options={catAndBanks?.banks?.map((bank) => {

                                    return { label: bank?.name, value: bank.id }
                                })
                                }>

                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button loading={loading} htmlType='submit'>Upload Capability</Button>
                </Form>


            </Drawer>
            <div className=' w-100 overflow-y-scroll ' style={{ background: "#343541" }}>
               {user && <Button style={{ position: "fixed", top: 100, right: 20, color: "white" }} onClick={() => setOpen(true)}>Uplaod Capability</Button>}
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