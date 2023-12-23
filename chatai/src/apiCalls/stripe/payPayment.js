import axios from "axios";
export const payPayment=(data) => {
    const url = `https://chatgptmall.tech/api/v1/item/checkout/`;
  return axios
  .post(url,data,{headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
     }
    })
    .then((data) => {
      return data
    })
    .catch((e) => {
      throw new Error(e);
    });
  };