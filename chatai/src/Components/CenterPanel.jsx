import React, { useContext, useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../context/contextApi";
import { Checkbox } from "antd";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  FaMicrophoneAltSlash,
  FaCopy,
  FaMicrophone,
  FaRobot,
  FaUser,
} from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
import TypeWritter from "./TypeWritter";
import TextToSpeech from "./TextToSpeech";
import DropDownButton from "./DropDownButton";
import MyRoomHistory from "./MyRoomHistory";
import OrgCard from "./OrgCard";
import { getOrganizations } from "../apiCalls/getOrganizations";

export default function CenterNav() {
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
  } = useContext(Context);

  const params = useParams();
  const navigate = useNavigate();

  const divRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [customerSupport, setCustomerSupport] = useState(0);
  const [organizations, setOrganizations] = useState([]);

  const [convertedAudio, setConvertedAudio] = useState("false");

  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
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
      await chatgptmall_room_textToText(input, customerSupport);
    } else if (
      localStorage.getItem("selected_api") === "Microsoft" ||
      selectedApi === "Microsoft"
    ) {
      await microsoft_textToText(input);
    } else {
      await microsoft_textToText(input);
    }
  };

  useEffect(() => {
    const userPermission = localStorage.getItem("user_permission");
    if (!userPermission) {
      navigate("/");
    } else {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) divElement.scrollTop = divElement?.scrollHeight;
  }, [roomHistory]);
  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) divElement.scrollTop = divElement?.scrollHeight;
  }, [response]);

  useEffect(() => {
    setConvertedAudio(transcript);
  }, [transcript]);
  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const data = await getOrganizations();
      setLoading(false);
      setOrganizations(data);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <>
      <div className="center-nav">
        {loading && (
          <span className={`loader ${active ? "active" : ""}`}>
            {" "}
            <PulseLoader color="#ffffff" size={"10px"} />
          </span>
        )}
        {localStorage.getItem("user_permission") &&
          params.segment1 &&
          params.id && (
            <DropDownButton
              className={"translate"}
              setShowDropdown={setShowDropdown1}
              showDropDown={showDropdown1}
              setValue={setTranslate}
            ></DropDownButton>
          )}
        {localStorage.getItem("user_permission") &&
          params.segment1 &&
          params.id && (
            <DropDownButton
              className={"language"}
              setShowDropdown={setShowDropdown}
              showDropDown={showDropdown}
              setValue={setLanguage}
            ></DropDownButton>
          )}
        {!(
          localStorage.getItem("user_permission") ||
          localStorage.getItem("openAi_apiKey") ||
          localStorage.getItem("chatgptmall_apikey") ||
          (localStorage.getItem("microsoft_apikey") &&
            localStorage.getItem("microsoft_endpoint"))
        ) && (
          !loading &&
          <div className={`home-page text-center ${active ? "active" : ""}`}>
            <h2 className="text-center  mb-5 ">Welcome To Skybrain</h2>
            <div className="d-flex w-100  justify-content-center flex-wrap">
              {
                organizations.map(({ name, category },index) => {
                  return (
                    <OrgCard title={name.length>9?name.slice(0,9)+"...":name} description={category}></OrgCard>
                  );
                })
              }
            </div>
          </div>
        )}
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
              <h6 className="text-center  text-white text-capitalize mt-5">
                {params.id !== undefined && `Room No ${params.id}`}
              </h6>
            )}
            <span>|</span>
            {params.id && params.segment1 && <MyRoomHistory />}
            {response?.map((res) => {
              return (
                <div
                  key={generateUniqueId}
                  className="response c_response d-flex flex-column text-white"
                >
                  <div className="input">
                    {(loading || res.input.length > 0) && (
                      <div
                        className={`user-query d-flex align-items-center gap-4 py-2 ${
                          active ? "active" : ""
                        }`}
                      >
                        <span className="ps-3">
                          <FaUser></FaUser>
                        </span>
                        <span
                          className="response-input"
                          style={{ fontSize: "1rem" }}
                        >
                          {res.input}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="response-text  d-flex py-3 gap-4">
                    <span className="ps-3" style={{ fontSize: "1.5rem" }}>
                      {res.input && <FaRobot></FaRobot>}
                    </span>
                    <p>
                      <TypeWritter response={res.response} />
                    </p>
                    <span className="speaker">
                      <TextToSpeech text={res.response}></TextToSpeech>
                    </span>
                    <span
                      onClick={() => {
                        copyContent(res.response);
                        toast.success("Copied to clipboard", {
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
                      className="copy"
                    >
                      <FaCopy color="rgb(145 146 160)"></FaCopy>
                    </span>
                  </div>
                </div>
              );
            })}
            <div className={` search-bar mt-5 ${active ? "active" : ""}`}>
              <input
                type="text"
                placeholder="Type a message or type '/' to select prompt..."
                className="form-control shadow"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                value={searchQuery || convertedAudio}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    setLoading(true);
                    callApi(searchQuery);
                    setSearchQuery("");
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
                  ></FaMicrophoneAltSlash>
                ) : (
                  <FaMicrophone
                    onClick={() => {
                      SpeechRecognition.stopListening();
                      callApi(transcript);
                      setConvertedAudio("");
                    }}
                    color="#ffffff"
                  ></FaMicrophone>
                )}
              </span>
              {params.id && params.segment1 && (
                <Checkbox
                  className="position-absolute  "
                  style={{ right: -170, color: "white", bottom: 12 }}
                  onChange={(value) => {
                    value ? setCustomerSupport(1) : setCustomerSupport(0);
                  }}
                >
                  Customer Support
                </Checkbox>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
