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


  const whatapp_url = "https://chatgptmall.tech/api/whatsapp/listing/";
  export const getWhatAppListing=() => {
   return axios
      .get(whatapp_url)
      .then((data) => {
        return data
      })
      .catch((e) => {
        throw new Error(e);
      });
  };