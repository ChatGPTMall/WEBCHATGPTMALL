import axios from "axios";
const url = "https://chatgptmall.tech/api/v1/room/items/share/";
export const itemsShare = (data) => {
  return axios
    .post(url, data)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
