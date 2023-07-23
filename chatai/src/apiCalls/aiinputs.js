
import axios from "axios";
const url = "https://chatgptmall.tech/api/v1/room/ocr/";
export const uploadImage = (data) => {

  
 return axios
    .post(url,data )
    .then((data) => {
        
      return data.data.response;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
