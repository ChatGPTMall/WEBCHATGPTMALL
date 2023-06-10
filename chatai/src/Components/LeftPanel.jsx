import { Link, useLocation, useParams } from "react-router-dom";
import {
  FaAddressBook,
  FaArrowLeft,
  FaCheck,
  FaHammer,
  FaKey,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../context/contextApi";
import { useContext, useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Button, Image, Spin } from "antd";
import { getRoomItems } from "../apiCalls/getItems";
import Modal from "antd/es/modal/Modal";
export default function LeftNav() {
  const {
    active,
    setActive,
    showOpenaiApiForm,
    setShowOpenaiApiForm,
    showChatgptmallApiForm,
    setShowChatgptmallApiForm,
    ApiKey,
    setApiKey,
    endpoint,
    setEndPoint,
    microSoftApiForm,
    setMicroSoftApiForm,
    microSoftEndPoint,
    setMicroSoftEndPoint,
    changeSelectedApi,
  } = useContext(Context);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [itemsData, setItemsData] = useState(undefined);
  const location = useLocation();
  const defaultOption =
    "API - " + localStorage.getItem("selected_api") || "Microsoft";

  const checkLocalStorage = () => {
    const keys = ["openAi_apiKey", "chatgptmall_apikey", "microsoft_apikey"];

    let presentKeys = 0;

    for (const key of keys) {
      if (localStorage.getItem(key)) {
        presentKeys++;
      }
    }

    return presentKeys >= 2;
  };
  const { segment1, id } = useParams();

  const apiPresentInLocalStorage = checkLocalStorage();

  const handleItemsClick = async () => {
    try {
      const roomId = location.pathname.split("/")[2];
      setLoading(true);
      setOpen(true);
      const { data } = await getRoomItems("room/items", roomId);
      setItemsData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    const checkLocalStorage = () => {
      const storedOptions = [];
      if (localStorage.getItem("chatgptmall_apikey")) {
        storedOptions.push("Chatgptmall");
      }
      if (localStorage.getItem("microsoft_apikey")) {
        storedOptions.push("Microsoft");
      }
      if (localStorage.getItem("openAi_apiKey")) {
        storedOptions.push("Openai");
      }
      setOptions(storedOptions);
    };

    checkLocalStorage();
  }, []);

  return (
    <>
      <Modal
        // bodyStyle={{background:"red"}}
        title={<h5 className="my-3 pb-3">Items Available In Room</h5>}
        centered
        closable={false}
        open={open}
        footer={[
          // Other buttons or elements in the footer
          <Button key="ok" type="primary" onClick={() => setOpen(false)}>
            OK
          </Button>,
        ]}
        width={"50%"}
      >
        <div className="d-flex justify-content-center">
          {loading && <Spin size="large" className="" />}
        </div>
        {!loading &&
          itemsData &&
          itemsData.results.map((item, index) => {
            return (
              <div key={index} className="my-3">
                {/* <img src={item.image} alt=""  height={70} width={70} /> */}
                <Image
                  preview={false}
                  width={70}
                  height={70}
                  src={item.image}
                  fallback="data:image/png;base64,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"
                />
                <span className="mx-3">{item.name}</span>
                
              </div>
              

            );
          })}
          
          
          
      </Modal>

      <FaArrowLeft
        onClick={() => {
          setActive(!active);
        }}
        className={`arrow ${active ? "rotate" : ""}`}
      ></FaArrowLeft>
      <div
        className={`left-nav ${
          active ? "hideNav" : "showNav"
        } d-flex flex-column justify-content-between`}
      >
        <div className="upper-section d-flex flex-column gap-2">
          <form>
            <input
              type="text"
              placeholder="Search..."
              className="form-control mt-2 py-2 rounded-0"
            />
          </form>
          {segment1 && id && (
            <Button
              className="mx-3 w-auto"
              type="link"
              style={{ color: "white", textAlign: "left" }}
              onClick={handleItemsClick}
            >
              Items In Room
            </Button>
          )}

          {apiPresentInLocalStorage && (
            <>
              <Dropdown
                className="dropdown"
                options={options}
                controlClassName="dropdown"
                onChange={(value) => {
                  localStorage.setItem("selected_api", value.value);
                  changeSelectedApi(value.value);
                  toast.success(value.value + "Api Selected", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                }}
                value={defaultOption}
                placeholder="Select an option"
              />
            </>
          )}
        </div>
        {!segment1 && !id && (
        <div className="lower-section">
          <ul className="list-group m-2 pt-3 rounded-0">
            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaKey></FaKey>
              </span>
              {!showChatgptmallApiForm && (
                <>
                  <span
                    onClick={() => {
                      setShowChatgptmallApiForm(true);
                    }}
                    >
                    Chatgptmall API Key
                  </span>
                </>
              )}
              {showChatgptmallApiForm && (
                <form className="d-flex align-items-center gap-2">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Api Key"
                    className="form-control form-control-sm"
                    value={ApiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                    }}
                    />
                  <span className="btn btn-sm text-white p-0 ">
                    <FaCheck
                      onClick={() => {
                        localStorage.setItem("chatgptmall_apikey", ApiKey);
                        setShowChatgptmallApiForm(false);
                        toast.success("Chatgptmall Api Saved", {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      }}
                      ></FaCheck>
                  </span>
                  <span className="btn btn-sm text-white p-0 ">
                    <FaArrowLeft
                      onClick={() => {
                        setShowChatgptmallApiForm(false);
                      }}
                      ></FaArrowLeft>
                  </span>
                </form>
              )}
            </li>

            {/* -------------------------------------------------------- */}

            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaKey></FaKey>
              </span>
              {!microSoftApiForm && !microSoftEndPoint && (
                <>
                  <span
                    onClick={() => {
                      setMicroSoftApiForm(true);
                    }}
                    >
                    Microsoft API Key
                  </span>
                </>
              )}
              {microSoftApiForm && microSoftApiForm && (
                <form className="d-flex align-items-center gap-2">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Api Key"
                    className="form-control form-control-sm"
                    value={ApiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                    }}
                    />
                  <span className="btn btn-sm text-white p-0 ">
                    <FaCheck
                      onClick={() => {
                        localStorage.setItem("microsoft_apikey", ApiKey);
                        setMicroSoftApiForm(false);
                        setMicroSoftEndPoint(true);
                        toast.success("Microsoft Api Saved", {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      }}
                      ></FaCheck>
                  </span>
                  <span className="btn btn-sm text-white p-0 ">
                    <FaArrowLeft
                      onClick={() => {
                        setMicroSoftApiForm(false);
                      }}
                      ></FaArrowLeft>
                  </span>
                </form>
              )}

              {microSoftEndPoint && (
                <form className="d-flex align-items-center gap-2">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Enter Endpoint"
                    className="form-control form-control-sm"
                    value={endpoint}
                    onChange={(e) => {
                      setEndPoint(e.target.value);
                    }}
                    />
                  <span className="btn btn-sm text-white p-0 ">
                    <FaCheck
                      onClick={() => {
                        localStorage.setItem("microsoft_endpoint", endpoint);
                        setShowChatgptmallApiForm(false);
                        setMicroSoftEndPoint(false);
                        toast.success("Endpoint Saved", {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      }}
                      ></FaCheck>
                  </span>
                  <span className="btn btn-sm text-white p-0 ">
                    <FaArrowLeft
                      onClick={() => {
                        setMicroSoftEndPoint(false);
                      }}
                      ></FaArrowLeft>
                  </span>
                </form>
              )}
            </li>

            {/* -------------------------------------------------------- */}

            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaKey></FaKey>
              </span>
              {!showOpenaiApiForm && (
                <>
                  <span
                    onClick={() => {
                      setShowOpenaiApiForm(true);
                    }}
                    >
                    Open AI Api Key
                  </span>
                </>
              )}
              {showOpenaiApiForm && (
                <form className="d-flex align-items-center gap-2">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Api Key"
                    className="form-control form-control-sm"
                    value={ApiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                    }}
                    />
                  <span className="btn btn-sm text-white p-0 ">
                    <FaCheck
                      onClick={() => {
                        localStorage.setItem("openAi_apiKey", ApiKey);
                        setShowOpenaiApiForm(false);
                        toast.success("OpenAi Api Saved", {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      }}
                      ></FaCheck>
                  </span>
                  <span className="btn btn-sm text-white p-0 ">
                    <FaArrowLeft
                      onClick={() => {
                        setShowOpenaiApiForm(false);
                      }}
                      ></FaArrowLeft>
                  </span>
                </form>
              )}
            </li>

            <Link
              to={"/settings"}
              className="li d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3"
              >
              <span className="icon">
                <FaHammer></FaHammer>
              </span>
              <span className="nav-link">Settings</span>
            </Link>

            <Link
              to={"/license"}
              className="li d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3"
              >
              <span className="icon">
                <FaAddressBook></FaAddressBook>
              </span>
              <span className="nav-link">Request Licenses</span>
            </Link>

            <Link
              to={"/create-licenses"}
              className="li d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3"
              >
              <span className="icon">
                <FaAddressBook></FaAddressBook>
              </span>
              <span className="nav-link">Create Licenses</span>
            </Link>
          </ul>
        </div>
        )}
      </div>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </>
  );
}
