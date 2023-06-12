import axios from "axios";
const BaseUrl = "https://chatgptmall.tech/api/v1/";
export const uploadItem = (apiUrl,data) => {

  const url = BaseUrl + apiUrl;
 return axios
    .post(url,data )
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};