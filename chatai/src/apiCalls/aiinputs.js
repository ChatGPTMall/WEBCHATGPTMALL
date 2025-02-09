
import axios from "axios";

export const uploadImage = (data) => {
  const url = "https://chatgptmall.tech/api/v1/room/text_to_text/";
 return axios
    .post(url,data, {headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }})
    .then((data) => {
        
      return data.data.response;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const OCRCreateItemAPI = (data) => {
  const url = "https://chatgptmall.tech/api/v1/ocr/item/upload/";
 return axios
    .post(url,data, {headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }})
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
