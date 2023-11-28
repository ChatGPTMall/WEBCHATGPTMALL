import axios from "axios";
  const url = "https://chatgptmall.tech/api/v1/credits/history/";
  export const getCreditHistory=() => {
   return axios
      .get(url,{headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }}, )
      .then((data) => {
        return data
      })
      .catch((e) => {
        throw new Error(e);
      });
  };