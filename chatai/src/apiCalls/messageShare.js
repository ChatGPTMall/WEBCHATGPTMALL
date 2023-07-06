import axios from "axios";
const url = "https://chatgptmall.tech/api/v1/room/response/share/";
export const messageShare = (data) => {
  return axios
    .post(url, data)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
