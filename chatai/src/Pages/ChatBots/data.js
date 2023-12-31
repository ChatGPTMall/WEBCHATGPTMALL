import axios from "axios";

export const getChatBotList = () => {
    const url = `https://chatgptmall.tech/api/v1/chatbots/`;
    return axios
      .get(url ,{
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