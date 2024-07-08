import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";
import { Button, Col, Drawer, Form, Input, Row, Select, Upload, } from 'antd'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { UploadOutlined } from '@ant-design/icons'
import {
  Bars3Icon,
  ChartPieIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { getCatAndBanks } from '../apiCalls/growthNetwork'
import { uploadBulkCapability } from '../apiCalls/growthNetwork'

function Header() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [catAndBanks, setCatAndBanks] = useState({});
  const [media, setMedia] = useState({ image: null, video: null });
  const [login, setLogin] = useState(false);
  const [communities, setCommunities] = useState([]);
  const {
    user,
    logout_User,
    getRoomCustomer

  } = useContext(Context);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  async function fetchCatAndBanks() {
    try {
      const { data } = await getCatAndBanks()
      setCatAndBanks(data)
    } catch (error) {

    }

  }

  const getCommunities = async () => {
    try {
      await axios
        .get("https://chatgptmall.tech/api/v1/home/communities/")
        .then((res) => {
          setCommunities(res?.data);
        });
    } catch (err) { }
  };

  // Create an array of objects with only community_id and name
  const communitiesData = communities.map(obj => ({ community_id: obj.community_id, name: obj.name }));

  // Convert the array to a JSON string
  const initialText = JSON.stringify(communitiesData, null, 2);

  const handleFormSumbit = async (value) => {
    try {
      setLoading(true)
      const formData = new FormData()
      Object.keys(value).map((key) => {
        if (key !== "image" && key !== "video") {
          console.log(key, typeof (key));
          if (key === "communities") {
            const communities = JSON.parse(value[key])
            const newArraycomm = communities.map(obj => obj.community_id);
            formData.append(key, newArraycomm)
          } else {
            formData.append(key, value[key])
          }
        }
        else {
          if (media[key]) {
            formData.append(key, media[key])
          }
        }
      })
      await uploadBulkCapability(formData)
      setLoading(false)
      setOpen(false)
    } catch (error) {
      setLoading(false)

    }
  }

  useEffect(() => {
    getCommunities();
    fetchCatAndBanks()
  }, [])

  const handleRoomClick = () => {
    if (user) {

      getRoomCustomer(user.home_name, user.home_key)
      navigate(`/${user.home_key}`)
    }
  }

  const handleLogin = () => {
    setLogin(true);
    navigate("/login");
  };
  const handleLogout = async () => {
    try {
      await logout_User()
    } catch (error) {

    }
  };
  const items = [
    {
      label: <Link className="font-Poppins" to={"/supplychain/explore"}>Search Networks</Link>,
      key: '0',
    },
    {
      label: user ? <Link className="font-Poppins" to={"/supplychain/joined"}>Joined Netwoeks</Link> : <></>,
      key: '1',
    },

  ];
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const growthNetworks = [
    { name: 'Search Networks', description: '', href: '/supplychain/explore', icon: ChartPieIcon },
    { name: 'Joined Networks', description: '', href: '/supplychain/joined', icon: ChartPieIcon },

  ]
  const chatbotItems = [
    { name: 'Whatsapp', description: '', href: '/chatbots', icon: ChartPieIcon },
    { name: 'Whatsapp User Guide', description: '', href: '/chatbots/userguide', icon: ChartPieIcon },
    { name: 'Wechat Official Accounts', description: '', href: '/wechat/chatbots', icon: ChartPieIcon },

  ]
  const shopListing = [
    { name: 'Wechat Listing', href: '/wechat_listing', icon: PlayCircleIcon },
    { name: 'WhatsappListing', href: '/whatapp_listing_home', icon: PhoneIcon },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <header className="bg-white position-sticky" style={{ top: 0, zIndex: 100 }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Homelinked</span>
            <p
              className="m-0 font-Poppins font-bold cursor-pointer text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
              onClick={() => navigate("/")}
            >
              Homelinked
            </p>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Drawer width={"100%"} title="Upload" placement="right" onClose={onClose} open={open}
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
              <Col span={24} className="d-flex">
                <Col span={12} >
                  <Form.Item name={"description"} label="Capability Description"
                    rules={[{ required: true, message: "Capability description is required" }]}

                  >

                    <textarea className="form-control" rows="8" id="inputAddress" placeholder="Item Description"></textarea>
                  </Form.Item>
                </Col>
                <Col span={12} >
                  <Form.Item name={"communities"} label="Communities"
                    rules={[{ required: true, message: "Capability description is required" }]}

                  >

                    <textarea className="form-control" rows="8" id="inputAddress" placeholder="Communites" defaultValue={initialText}></textarea>
                  </Form.Item>
                </Col>
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
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">

            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Growth Networks
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>


            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {growthNetworks.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}

                </div>
              </Popover.Panel>
            </Transition>


          </Popover>

          {/* snfkjsdfnks */}
          {user && <Popover className="relative">

            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Chatbots
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>


            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {chatbotItems.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}

                </div>
              </Popover.Panel>
            </Transition>


          </Popover>}


          <Popover className="relative">

            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Shop
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>


            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {shopListing.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}

                </div>
              </Popover.Panel>
            </Transition>


          </Popover>


          {/* {user && <Link to={"/chatbots"} className="text-sm font-semibold leading-6   text-gray-900">
            Chatbots
          </Link>} */}
          <Link target="_blank" to={"https://chatgptmall.tech/swagger/"} className="text-sm   font-semibold leading-6 text-gray-900">

            APIs
          </Link>
          <Link to={"/usage"} className="text-sm font-semibold leading-6   text-gray-900">
            Usage
          </Link>

          {user && user.premium == 2 && <a style={{ cursor: "pointer" }} onClick={() => setOpen(true)} className="text-sm font-semibold leading-6   text-gray-900">
            Bulk Items Upload
          </a>}

        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">


          {user ? <>
            <Button onClick={handleLogout} type="link" className="text-sm font-semibold leading-6 text-gray-900">
              Logout <span aria-hidden="true">&rarr;</span>
            </Button>
          </> : <Button onClick={handleLogin} type="link" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Button>}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>

                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Growth Networks
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>

                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...growthNetworks].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}

                      </Disclosure.Panel>

                    </>
                  )}
                </Disclosure>
                {user && <Link to={"/chatbots"} className="text-sm font-semibold leading-6   text-gray-900">
                  Chatbots
                </Link>}
                <Link target="_blank" to={"https://chatgptmall.tech/swagger/"} className="text-sm  block font-semibold leading-6 text-gray-900">

                  APIs
                </Link>
                <Link to={"/usage"} className="text-sm font-semibold leading-6 block  text-gray-900">
                  Usage
                </Link>

                <Link to={"/wechat_listing"} className="text-sm font-semibold leading-6 block  text-gray-900">
                  Wechat Listing
                </Link>



              </div>
              <div className="py-6">
                {user ? <>
                  <Button onClick={handleLogout} type="link" className="text-sm font-semibold leading-6 text-gray-900">
                    Logout <span aria-hidden="true">&rarr;</span>
                  </Button>
                </> : <Button onClick={handleLogin} type="link" className="text-sm font-semibold leading-6 text-gray-900">
                  Log in <span aria-hidden="true">&rarr;</span>
                </Button>}
              </div>
            </div>

          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}


export default Header;
