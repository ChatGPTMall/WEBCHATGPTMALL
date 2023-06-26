import axios from "axios";
const BaseUrl = "https://chatgptmall.tech/api/v1/room/items/detail/";
export const getItemDetails = ( params) => {
  
  
  return axios
    .get(BaseUrl, {
      params
    })
    .then(({ data }) => {
    return data
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};
