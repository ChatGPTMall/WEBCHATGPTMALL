import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../context/contextApi";
import { Button, Checkbox, Dropdown, Image, Spin } from "antd";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import {
  FaPaperclip,
  FaMicrophoneAltSlash,
  FaCopy,
  FaMicrophone,
  FaRobot,
  FaUser,
  FaShare,
} from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
import linkedInIcon from "../assets/linkedin.png";
import TextToSpeech from "./TextToSpeech";
import DropDownButton from "./DropDownButton";
import MyRoomHistory from "./MyRoomHistory";
import OrgCard from "./OrgCard";
import { getOrganizations } from "../apiCalls/getOrganizations";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { addFavourites } from "../apiCalls/favourites";
import Avatar from "antd/es/avatar/avatar";
import ShareModel from "./ShareModel";
import Upload from "antd/es/upload/Upload";
import { CustomLinkify } from "./CustomLinkify";

// --- Markdown-related imports:
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// For syntax highlighting:
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// pick a theme or style you like
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function CenterNav() {
  const [fileUploading, setFileUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");

  const {
    active,
    setActive,
    searchQuery,
    setSearchQuery,
    openai_textToText,
    chatgptmall_textToText,
    chatgptmall_room_textToText,
    microsoft_textToText,
    setLanguage,
    setTranslate,
    responseInput,
    loading,
    response,
    setLoading,
    generateUniqueId,
    selectedApi,
    roomHistory,
    setresponse,
    imageUpload,
    user,
  } = useContext(Context);

  const params = useParams();
  const navigate = useNavigate();
  const divRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [customerSupport, setCustomerSupport] = useState(0);
  const [organizations, setOrganizations] = useState([]);
  const [isShareModelCompOpen, setIsShareModelCompOpen] = useState(false);
  const [activeShareId, setActiveShareId] = useState(null);
  const [convertedAudio, setConvertedAudio] = useState("");

  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleImageChange = async ({ file }) => {
    await handlePreview(file);
    setFile(file);
  };

  const onCopyClick = async (link) => {
    try {
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
      toast.error("Something Went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        // ...
      });
    }
  };

  const getShareItems = (id) => {
    const lHref = `https://www.linkedin.com/sharing/share-offsite/?url=http://homelinked.tech/${params.id}/history/details/${id}`;
    const historyResLink = `http://homelinked.tech/${params.id}/history/details/${id}`;
    const items = [
      {
        key: "1",
        label: (
          <a rel="noopener noreferrer" href={lHref} target="_blank">
            <img
              className="social-media-img"
              src={linkedInIcon}
              height={25}
              width={25}
              alt="linkedInIcon"
            />
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <span
            onClick={() => {
              onCopyClick(historyResLink);
            }}
          >
            <FaCopy
              color="rgb(145 146 160)"
              style={{ width: 25, height: 25 }}
            />
          </span>
        ),
      },
      {
        key: "6",
        label: (
          <Avatar
            style={{ backgroundColor: "#87d068", verticalAlign: "middle" }}
            size={30}
            gap={0}
            onClick={() => {
              setIsShareModelCompOpen(true);
              setActiveShareId(id);
            }}
          >
            H
          </Avatar>
        ),
      },
    ];
    return items;
  };

  if (!browserSupportsSpeechRecognition) {
    console.log(
      "Your browser does not support speech recognition! Try Chrome desktop?"
    );
  }

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const callApi = async (input) => {
    if (
      localStorage.getItem("selected_api") === "Openai" ||
      selectedApi === "Openai"
    ) {
      await openai_textToText(input);
    } else if (
      (localStorage.getItem("selected_api") === "Chatgptmall" ||
        selectedApi === "Chatgptmall") &&
      !localStorage.getItem("user_permission")
    ) {
      await chatgptmall_textToText(input);
    } else if (
      (localStorage.getItem("selected_api") === "Chatgptmall" ||
        selectedApi === "Chatgptmall") &&
      localStorage.getItem("user_permission")
    ) {
      await chatgptmall_room_textToText(input, customerSupport, file);
    } else if (
      localStorage.getItem("selected_api") === "Microsoft" ||
      selectedApi === "Microsoft"
    ) {
      await microsoft_textToText(input);
    } else {
      await microsoft_textToText(input);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    setFileUploading(true);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setFileUploading(false);
  };

  useEffect(() => {
    const userPermission = localStorage.getItem("user_permission");
    if (!userPermission) {
      navigate("/");
    } else {
      setActive(false);
    }
  }, [navigate, setActive]);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      divElement.scrollTop = divElement.scrollHeight;
    }
  }, [roomHistory]);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      divElement.scrollTop = divElement.scrollHeight;
    }
  }, [response]);

  useEffect(() => {
    setConvertedAudio(transcript);
  }, [transcript]);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const data = await getOrganizations();
      setOrganizations(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHeartClick = async (data) => {
    try {
      await addFavourites({
        ...data,
        room_key: localStorage.getItem("room_key"),
      });
      // update local state to reflect favorite
      const newResponse = response.map((res) => {
        if (res.history === data.history) {
          toast.success("Successfully added to Favourites", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
          });
          return { ...res, is_favourite: true };
        }
        return res;
      });
      setresponse(newResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return user?.credits ? (
    <>
      <ShareModel
        isShareModelCompOpen={isShareModelCompOpen}
        setIsShareModelCompOpen={setIsShareModelCompOpen}
        id={activeShareId}
      />
      <div className="center-nav">
        {loading && (
          <span className={`loader ${active ? "active" : ""}`}>
            <PulseLoader color="#ffffff" size={"10px"} />
          </span>
        )}

        {/* Language/Translate dropdowns */}
        {localStorage.getItem("user_permission") &&
          params.segment1 &&
          params.id && (
            <DropDownButton
              className={"translate"}
              setShowDropdown={setShowDropdown1}
              showDropDown={showDropdown1}
              setValue={setTranslate}
            />
          )}
        {localStorage.getItem("user_permission") &&
          params.segment1 &&
          params.id && (
            <DropDownButton
              className={"language"}
              setShowDropdown={setShowDropdown}
              showDropDown={showDropdown}
              setValue={setLanguage}
            />
          )}

        {/*
          If no user_permission / API credentials, show the organization cards
        */}
        {!(localStorage.getItem("user_permission") ||
          localStorage.getItem("openAi_apiKey") ||
          localStorage.getItem("chatgptmall_apikey") ||
          (localStorage.getItem("microsoft_apikey") &&
            localStorage.getItem("microsoft_endpoint"))) &&
          !loading && (
            <div className={`home-page text-center ${active ? "active" : ""}`}>
              <h2 className="text-center  mb-5 ">Welcome To Skybrain</h2>
              <div className="d-flex w-100 justify-content-center flex-wrap">
                {organizations?.map(({ name, category, image }, index) => {
                  return (
                    <OrgCard
                      key={index}
                      title={
                        name.length > 9 ? name.slice(0, 9) + "..." : name
                      }
                      image={image}
                    />
                  );
                })}
              </div>
            </div>
          )}

        {/* If user has permission or credentials, show chat UI */}
        {(localStorage.getItem("user_permission") ||
          localStorage.getItem("openAi_apiKey") ||
          localStorage.getItem("chatgptmall_apikey") ||
          (localStorage.getItem("microsoft_apikey") &&
            localStorage.getItem("microsoft_endpoint"))) && (
          <div
            id="chatbot"
            ref={divRef}
            className={`chatbot-ui ${active ? "active" : ""}`}
          >
            {!loading && responseInput.length < 1 && (
              <h2 className="text-center text-capitalize">
                {params.segment1 !== undefined
                  ? `Welcome to ${params.segment1}`
                  : "Text To Text"}
              </h2>
            )}

            {!loading && responseInput.length < 1 && params.id && (
              <h6 className="text-center text-white text-capitalize mt-5">
                {params.id !== undefined && `Room No ${params.id}`}
              </h6>
            )}

            <MyRoomHistory getShareItems={getShareItems} />

            {response?.map((res) => (
              <div
                key={res.history || generateUniqueId()}
                className="response c_response d-flex flex-column text-white"
              >
                {/* User input */}
                <div className="input">
                  {(loading || res.input?.length > 0) && (
                    <div
                      className={`user-query d-flex align-items-center gap-4 py-2 ${
                        active ? "active" : ""
                      }`}
                    >
                      <span className="ps-3">
                        <FaUser />
                      </span>
                      <span
                        className="response-input"
                        style={{ fontSize: "1rem" }}
                      >
                        {/* If user has an uploaded image, show it */}
                        {res.image && (
                          <img
                            src={res.image}
                            alt="User Upload"
                            style={{
                              maxWidth: "39%",
                              height: "auto",
                              marginBottom: "23px",
                            }}
                          />
                        )}
                        {res.user_input}
                      </span>
                    </div>
                  )}
                </div>

                {/* AI Response */}
                <div className="response-text d-flex py-3 gap-4">
                  {res.input && (
                    <span className="ps-3" style={{ fontSize: "1.5rem" }}>
                      <FaRobot />
                    </span>
                  )}

                  {/* 
                    Use ReactMarkdown to render the text. 
                    This will properly show code blocks and images 
                  */}
                  <div style={{ flexGrow: 1, overflow: "hidden" }}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      // highlight code fences:
                      components={{
                        code({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match?.[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {res.response}
                    </ReactMarkdown>
                  </div>

                  {/* Text to speech */}
                  <span className="speaker">
                    <TextToSpeech text={res.response} />
                  </span>

                  {/* Heart (like) button */}
                  <Button
                    type="link"
                    className="heart p-0"
                    onClick={() =>
                      handleHeartClick({
                        user_input: res.input,
                        response: res.response,
                        history: res.history,
                      })
                    }
                  >
                    {res.is_favourite ? <HeartFilled /> : <HeartOutlined />}
                  </Button>

                  {/* Share dropdown */}
                  <Dropdown
                    menu={{ items: getShareItems(res.history) }}
                    placement="bottomLeft"
                    arrow
                  >
                    <Button type="link" className="share p-0">
                      <FaShare />
                    </Button>
                  </Dropdown>

                  {/* Copy to clipboard */}
                  <span
                    onClick={() => {
                      copyContent(res.response);
                    }}
                    className="copy"
                  >
                    <FaCopy color="rgb(145 146 160)" />
                  </span>
                </div>
              </div>
            ))}

            {/* Input area */}
            <div className={`search-bar mt-5 ${active ? "active" : ""}`}>
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  color: "white",
                  right: "0px",
                }}
              >
                {fileUploading ? (
                  <Spin className="mb-4 mx-2" />
                ) : previewImage ? (
                  <Image
                    loading={fileUploading}
                    width={40}
                    height={40}
                    alt="example"
                    style={{ borderRadius: 10 }}
                    src={previewImage}
                  />
                ) : null}

                <Upload
                  beforeUpload={() => false}
                  onChange={handleImageChange}
                  showUploadList={false}
                >
                  <FaPaperclip className="mx-1" size={40} />
                </Upload>
              </div>

              <textarea
                rows={3}
                style={{
                  background: "#343541",
                  color: "white",
                }}
                type="text"
                placeholder="Type a message or type '/' to select prompt..."
                className="form-control shadow"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery || convertedAudio}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    setLoading(true);
                    callApi(searchQuery);
                    setSearchQuery("");
                    setPreviewImage("");
                  }
                }}
              />

              <span
                onClick={() => {
                  setRecording(!recording);
                }}
                className="microphone"
              >
                {!listening ? (
                  <FaMicrophoneAltSlash
                    onClick={() => {
                      setSearchQuery("");
                      SpeechRecognition.startListening({ continuous: true });
                      resetTranscript();
                    }}
                    color="#ffffff"
                  />
                ) : (
                  <FaMicrophone
                    onClick={() => {
                      SpeechRecognition.stopListening();
                      callApi(transcript);
                      setConvertedAudio("");
                    }}
                    color="#ffffff"
                  />
                )}
              </span>

              {params.id && (
                <Checkbox
                  className="position-absolute"
                  style={{ right: -170, color: "white", bottom: 12 }}
                  onChange={(e) => {
                    e.target.checked
                      ? setCustomerSupport(1)
                      : setCustomerSupport(0);
                  }}
                >
                  Ask For Support
                </Checkbox>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    // If user doesn't have enough credits
    <div className="d-flex justify-content-center align-items-center bg-dark w-100 h-[100vh]">
      <h5 style={{ color: "white" }}>
        Not Enough Credits <Link style={{ color: "#2A8AE5" }} to={"/usage"}>Usage</Link>
      </h5>
    </div>
  );
}