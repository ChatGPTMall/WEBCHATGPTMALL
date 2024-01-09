import axios from "axios";

export const getChatBotList = () => {
  const url = `https://chatgptmall.tech/api/v1/chatbots/`;
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const saveChatBot = (data) => {
  const url = `https://chatgptmall.tech/api/v1/chatbots/`;
  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const deleteChatBot = (params) => {
  const url = `https://chatgptmall.tech/api/v1/chatbot/`;

  return axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params,
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const integrateWhatsappChatBot = (data) => {
  const url = `https://chatgptmall.tech/api/v1/whatsapp/configuration/`;
  return axios
    .post(url,data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const updateChatBot = (data,params) => {
  const url = `https://chatgptmall.tech/api/v1/chatbot/`;
  return axios
    .put(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};