import axios from "axios";
  const url = "https://chatgptmall.tech/api/wechat/listing/";
  export const getWechatListing=() => {
   return axios
      .get(url)
      .then((data) => {
        return data
      })
      .catch((e) => {
        throw new Error(e);
      });
  };