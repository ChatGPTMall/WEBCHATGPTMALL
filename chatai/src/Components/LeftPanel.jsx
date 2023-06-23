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
import RoomItems from "./LeftPanelItems/RoomItems";
import CustomerSupportItems from "./LeftPanelItems/CustomerSupportItems";
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
  const p = useParams();

  const location = useLocation();

  const apiPresentInLocalStorage = checkLocalStorage();

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
          {segment1 && id && !location.pathname.includes("support") && <RoomItems />}
          {segment1 && id && location.pathname.includes("support") && <CustomerSupportItems />}

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
