import axios from "axios";
const BaseUrl = "https://chatgptmall.tech/api/v1/";
export const validateKey = (apiUrl, params) => {
  const url = BaseUrl + apiUrl;
  return axios
    .get(url, {
      params: {
        room_id: params.roomId,
        room_key:params.roomKey
      },
    })
    .then((data ) => {
     return data
    })
    .catch((e) => {
      new Error(e);
    });
};
