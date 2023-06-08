import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Context = createContext();

export const AppContext = (props) => {
  let Data = [];

  function generateUniqueId() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const uniqueId = timestamp + randomNum;
    return uniqueId;
  }

  const BaseUrl = "https://chatgptmall.tech/api/v1/";

  const [active, setActive] = useState(false);
  const [showOpenaiApiForm, setShowOpenaiApiForm] = useState(false);
  const [showChatgptmallApiForm, setShowChatgptmallApiForm] = useState(false);
  const [microSoftApiForm, setMicroSoftApiForm] = useState(false);
  const [microSoftEndPoint, setMicroSoftEndPoint] = useState(false);
  const [ApiKey, setApiKey] = useState("");
  const [endpoint, setEndPoint] = useState("");
  const [response, setresponse] = useState([]);
  const [responseText, setresponseText] = useState([]);
  const [responseInput, setresponseInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedApi, changeSelectedApi] = useState("Microsoft");
  const [no_of_licenses, setNoOfLicenses] = useState(null);
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [room_key, setRoom_Key] = useState("");
  const [room_organization, setRoom_Organization] = useState("");
  const [room_id, setRoom_Id] = useState("");
  const [language, setLanguage] = useState("");
  const [translate, setTranslate] = useState("");
  const [supervisor_room_id, set_supervisor_room_id] = useState("");
  const [supervisor_room_key, set_supervisor_room_key] = useState("");
  const [room_History, set_Room_History] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("chatgptmall_apikey")}`,
    },
  };

  const fetchData = async (apiUrl, body, requestOptions = {}, Params = {}) => {
    try {
      if (Params) {
        const { room_id, language,translate } = Params;
        console.log(Params)
        var params={}
        if(language){

           params = { room_id, language };
        }
        else if(translate){
          params = { room_id, translate };
        }
      }

      const res = await axios.post(apiUrl, body, { ...requestOptions, params });
      setresponseText(res.data.response);
      Data.push(...response, res.data);
      console.log(Data);
      setresponse(Data);
      setresponseInput(res.data.input);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const openai_textToText = (input) => {
    setLoading(true);
    const apiUrl = BaseUrl + "openai/text_to_text/";
    const params = {
      openai_key: localStorage.getItem("openAi_apiKey"),
    };
    const requestOptions = { params };
    fetchData(apiUrl, { input }, requestOptions);
  };

  const chatgptmall_textToText = (input) => {
    setLoading(true);
    const apiUrl = BaseUrl + "text_to_text/";
    const requestOptions = { headers: config.headers };
    fetchData(apiUrl, { input }, requestOptions);
  };

  const chatgptmall_room_textToText = (input) => {
    setLoading(true);
    const apiUrl = BaseUrl + "room/text_to_text/";
    const language = localStorage.getItem("language");
    const translate = localStorage.getItem("translate");

    const room_id = localStorage.getItem("room_id");
    const requestOptions = { headers: config.headers };
    fetchData(apiUrl, { input }, requestOptions, { room_id, language,translate });
  };

  const microsoft_textToText = (input) => {
    setLoading(true);
    const apiUrl = BaseUrl + "ms/text_to_text/";
    const body = {
      input: input,
      endpoint: localStorage.getItem("microsoft_endpoint"),
      ms_key: localStorage.getItem("microsoft_apikey"),
    };
    fetchData(apiUrl, body);
  };

  const getLicense = async () => {
    setLoading(true);
    if (no_of_licenses === null || organization === "" || email === "") {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
    const apiUrl = BaseUrl + "licenses/";
    const body = {
      no_of_licenses,
      organization,
      email,
    };
    try {
      const res = await axios.post(apiUrl, body);
      console.log(res);
      if (res.status === 201) {
        toast.success(res.data.msg);
      }
      if (res.status === 200) {
        toast.warning(res.data.msg);
      }
      setLoading(false);
      setNoOfLicenses("");
      setOrganization("");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const createLicense = async (data) => {
    setLoading(true);
    if (data) {
      const apiUrl = BaseUrl + "create_licenses/";
      try {
        const res = await axios.post(apiUrl, data);
        if (res.status === 200) {
          toast.warning(res.data.msg);
        }
        if (res.status === 201) {
          toast.success(res.data.msg);
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
    }
    setLoading(false);
  };

  const getCustomer = async () => {
    setLoading(true);
    if (
      room_id.length > 0 &&
      room_key.length > 0 &&
      room_organization.length > 0
    ) {
      const apiUrl = BaseUrl + "skybrain/customer/";
      try {
        const res = await axios.post(apiUrl, {
          room_id: parseFloat(room_id),
          room_key,
          organization: room_organization,
        });
        if (res.status === 201) {
          toast.success(res.data.msg);
          changeSelectedApi("Chatgptmall");
          localStorage.setItem("selected_api", "Chatgptmall");
          localStorage.setItem("user_permission", room_key);
          window.location.href = "/" + room_organization + "/" + room_id;
        }
      } catch (err) {
        console.log(err);
        toast.error(
          err?.response?.data?.error
            ? err.response.data.error
            : "Something went wrong!"
        );
      }
    }
    setLoading(false);
  };

  const validateCredentials = async () => {
    const apiUrl = BaseUrl + "room/validate/";
    const params = {
      room_id: parseFloat(supervisor_room_id),
      room_key: supervisor_room_key,
    };
    try {
      const res = await axios.get(apiUrl, { params });
      if (res.status === 200) {
        localStorage.setItem("supervisor_room_id", supervisor_room_id);
        localStorage.setItem("supervisor_room_key", supervisor_room_key);
        window.location.href = "supervisor/room/history";
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const get_Room_History = async () => {
    const apiUrl = BaseUrl + "room/history/";
    const params = {
      room_id: localStorage.getItem("supervisor_room_id"),
      room_key: localStorage.getItem("supervisor_room_key"),
    };
    try {
      const res = await axios.get(apiUrl, { params });
      if (res.status === 200) {
        set_Room_History(res.data.results);
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };
  

  return (
    <Context.Provider
      value={{
        active,
        setActive,
        showOpenaiApiForm,
        setShowOpenaiApiForm,
        showChatgptmallApiForm,
        setShowChatgptmallApiForm,
        microSoftApiForm,
        setMicroSoftApiForm,
        microSoftEndPoint,
        setMicroSoftEndPoint,
        chatgptmall_room_textToText,
        microsoft_textToText,
        ApiKey,
        setApiKey,
        endpoint,
        setEndPoint,
        responseText,
        setresponseText,
        searchQuery,
        setSearchQuery,
        openai_textToText,
        chatgptmall_textToText,
        responseInput,
        loading,
        response,
        setLoading,
        generateUniqueId,
        selectedApi,
        changeSelectedApi,
        getLicense,
        setNoOfLicenses,
        setOrganization,
        setEmail,
        no_of_licenses,
        organization,
        email,
        createLicense,
        room_id,
        setRoom_Id,
        room_key,
        setRoom_Key,
        room_organization,
        setRoom_Organization,
        getCustomer,
        language,
        setLanguage,
        setTranslate,
        translate,
        supervisor_room_key,
        set_supervisor_room_key,
        supervisor_room_id,
        set_supervisor_room_id,
        validateCredentials,
        get_Room_History,
        room_History
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
