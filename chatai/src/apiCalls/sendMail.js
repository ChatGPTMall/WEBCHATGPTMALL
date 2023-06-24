import axios from "axios";
const url = "https://chatgptmall.tech/api/v1/room/items/email/";
export const sendEmail = (data) => {


 return axios
    .post(url,data )
    .then((data) => {
      return data;
    })
    .catch((e) => {
        
      throw new Error(e.response.data.email);
    });
};