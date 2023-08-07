import axios from "axios";
const url = "https://chatgptmall.tech/api/v1/room/share/";
export const roomAccessApi = (emails)  => {
   const params = {
    "email": emails,
    "room_key": localStorage.getItem('room_key')
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
