import axios from "axios";
  const url = "https://chatgptmall.tech/api/v2/profile/";
  export const getUser=() => {
   return axios
      .get(url,{headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }}, )
      .then((data) => {
        return data
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

//   https://chatgptmall.tech/api/v2/logout/
export const logoutUser=() => {
    const url = "https://chatgptmall.tech/api/v2/logout/";
    return axios
    .post(url,null,{headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }})
    .then((data) => {
      return data
    })
    .catch((e) => {
      throw new Error(e);
    });
};