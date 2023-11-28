import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser, logoutUser } from "../apiCalls/auth";

export const Context = createContext();

export const AppContext = (props) => {
  let Data = [];

  function generateUniqueId() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(
      Math.random() * 1000000 * Math.random() * 1000000
    )
      .toString()
      .padStart(6, "0");
    const uniqueId = timestamp + randomNum;
    return uniqueId;
  }

  const BaseUrl = "https://chatgptmall.tech/api/v1/";
  const [active, setActive] = useState(false);
  const [user,setUser]=useState(null)
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
  const [room_key, setRoom_Key] = useState(localStorage.getItem("room_key"));
  const [room_organization, setRoom_Organization] = useState("");
  const [room_id, setRoom_Id] = useState(localStorage.getItem("room_id"));
  const [language, setLanguage] = useState("");
  const [translate, setTranslate] = useState("");
  const [supervisor_room_id, set_supervisor_room_id] = useState("");
  const [supervisor_room_key, set_supervisor_room_key] = useState("");
  const [room_History, set_Room_History] = useState([]);
  const [roomHistory, setRoomHistory] = useState([]);
  const [isValidKey, setIsValidKey] = useState(false);
  const [anbProperties, setAnbProperties] = useState([]);
  const [isVisitor, setIsVisitor] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const get_User = async () => {
    try {
      const { data } = await getUser()
      setUser(data)
      return true
    } catch (error) {
      return false
    }

  }
  const logout_User = async () => {
    try {
       await logoutUser()
       localStorage.clear()
      setUser(null)
      return true
    } catch (error) {
      return false
    }

  }

  const fetchData = async (apiUrl, body, requestOptions = {}, Params = {}) => {
    try {
      if (Params) {
        const { room_key, language, translate } = Params;
        var params = {};
        if (language) {
          params = { room_key, language };
        } else if (translate) {
          params = { room_key, translate };
        }
      }

      const res = await axios.post(apiUrl, body, { ...requestOptions, params });
      setresponseText(res.data.response);
      Data.push(...response, res.data);
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

  const chatgptmall_room_textToText = (input, customerSupport = 0,file=null) => {
    setLoading(true);
    const apiUrl = BaseUrl + "room/text_to_text/";
    const translate = localStorage.getItem("translate");
    const language = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "English";

    const room_key = localStorage.getItem("room_key");
    const requestOptions = { headers: config.headers };
      // Create a new FormData object
    const formData = new FormData();

    // Append the fields to the FormData object
    formData.append('input', input);
    formData.append('customer_support', customerSupport);
    if(file){
      formData.append('file', file);
    }


    if (imageUpload) {
      formData.append('image', imageUpload);
    }

    fetchData(
      apiUrl,
      formData,
      requestOptions,
      { room_key, language, translate },
      { room_id }
    );
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
    const params = new URLSearchParams(window.location.search);
    const visitorParam = params.get("visitor");
    const contributorParam = params.get("contributor");
    const userType =
      visitorParam === "true"
        ? "visitor"
        : contributorParam === "true"
        ? "contributor"
        : "";
    localStorage.setItem("visitor", visitorParam === "true");
    localStorage.setItem("contributor", contributorParam === "true");

    setLoading(true);
    if (
      room_id.length > 0 &&
      room_key.length > 0 &&
      room_organization.length > 0
    ) {
      const apiUrl = BaseUrl + "skybrain/customer/";
      try {
        const res = await axios.post(apiUrl, {
          room_id: room_id,
          room_key: room_key.trim(),
          organization: room_organization,
          user_type: userType,
        });
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.msg);
          changeSelectedApi("Chatgptmall");
          localStorage.setItem("room_key", room_key);
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
      room_id: supervisor_room_id,
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

  const getRoomCustomer = async (room_id, room_key) => {
    setLoading(true);
    if (room_id.length > 0 && room_key.length > 0) {
      const apiUrl = BaseUrl + "room/validate/";
      const params = {
        room_id: room_id,
        room_key: room_key,
      };
      try {
        const res = await axios.get(apiUrl, { params });
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.msg);
          changeSelectedApi("Chatgptmall");
          localStorage.setItem("room_key", room_key);
          localStorage.setItem("selected_api", "Chatgptmall");
          localStorage.setItem("user_permission", room_key);
          window.location.href = "/" + room_id;
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
        setresponse,
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
        getRoomCustomer,
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
        room_History,
        setRoomHistory,
        roomHistory,
        isValidKey,
        setIsValidKey,
        anbProperties,
        setAnbProperties,
        isVisitor,
        setIsVisitor,
        imageUpload, 
        setImageUpload,
        get_User,user,logout_User
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
