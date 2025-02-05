import axios from "axios";
export const supplyChainWithAuth = (params) => {
  const url = "https://chatgptmall.tech/api/v1/community/";
  return axios
  .get(url,{headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,}
  })
    .then((data ) => {
     return data
    })
    .catch((e) => {
      new Error(e);
    });
};
export const supplyChainWithoutAuth = (params) => {
    const url = "https://chatgptmall.tech/api/v1/home/communities/";
    return axios
      .get(url)
      .then((data ) => {
       return data
      })
      .catch((e) => {
        new Error(e);
      });
  };
  export const JoinSupplyChain = (ID) => {
    const url = "https://chatgptmall.tech/api/v1/community/";
    return axios
      .post(url,{community_id:ID},{headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }})
      .then((data ) => {
       return data
      })
      .catch((e) => {
        new Error(e);
      });
  };
  export const joinedSupplyChain = (token) => {
    const url = "https://chatgptmall.tech/api/v1/joined/communities/";
    return axios
      .get(url,{headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }

      }
      )
      .then((data ) => {
       return data
      })
      .catch((e) => {
        new Error(e);
      });
  };

  export const createCoupon = (data) => {
    const url = `https://chatgptmall.tech/api/v1/coupon/`;
    return axios
      .post(url,data,{headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }})
      .then((data ) => {
       return data
      })
      .catch((e) => {
        new Error(e);
      });
  };
  