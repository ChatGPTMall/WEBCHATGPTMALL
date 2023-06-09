import axios from "axios";
const BaseUrl = "https://chatgptmall.tech/api/v1/";
export const getRoomItems = (apiUrl, roomId) => {
  const url = BaseUrl + apiUrl;
 return axios
    .get(url, {
      params: {
        room_id: roomId,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return e;
    });
};
