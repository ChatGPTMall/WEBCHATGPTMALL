import axios from "axios";
const url = "https://chatgptmall.tech/api/v1/room/queries/update/";
export const sendReply = (data) => {


 return axios
    .post(url,data )
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};