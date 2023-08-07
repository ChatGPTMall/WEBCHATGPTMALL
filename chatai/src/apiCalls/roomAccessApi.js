import axios from "axios";
const url = "https://chatgptmall.tech/api/v1/room/share/";
export const roomAccessApi = ()  => {
   const params = {
    "email": ['aqirlone109@mail.com'],
    "room_key": "123456"
}
  
  return axios
    .post(url,  params)
    .then((data) => {
      console.log(data.data.msg)
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
