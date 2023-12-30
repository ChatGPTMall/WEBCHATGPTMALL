import axios from "axios";
// export const getNetworkGrowthItems=() => {
//       const url = `https://chatgptmall.tech/api/v1/items/`;
//    return axios
//    .get(url,{headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   }}, )
//       .then((data) => {
//         return data
//       })
//       .catch((e) => {
//         throw new Error(e);
//       });
//   };

export const getNetworkGrowthItemsWithouAuth = (nID) => {
  const url = `https://chatgptmall.tech/api/v1/posts/${nID}/`;
  return axios
    .get(url)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const getNetworkGrowthItems = (nID) => {
  if (!localStorage.getItem("token")) {
    return getNetworkGrowthItemsWithouAuth(nID);
  }
  const url = `https://chatgptmall.tech/api/v1/growth_network/${nID}/`;
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const getCatAndBanks = () => {
  const url = `https://chatgptmall.tech/api/v1/filters/`;
  return axios
    .get(url)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
//https://chatgptmall.tech/api/v1/filters/
//https://chatgptmall.tech/api/v1/growth_network/%7Bnetwork_id%7D/capability/upload/
export const uploadCapability = (data, params) => {
  const url = `https://chatgptmall.tech/api/v1/items/`;
  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params,
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const updateLikes = (data) => {
  const url = `https://chatgptmall.tech/api/v1/posts/like/`;
  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const updateComments = (data) => {
  const url = `https://chatgptmall.tech/api/v1/posts/comments/`;
  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const getComments = (params) => {
  const url = `https://chatgptmall.tech/api/v1/posts/comments/`;
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params,
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const getPostDetails = (params) => {
  const url = `https://chatgptmall.tech/api/v1/post/detail/`;
  return axios
    .get(url, { params })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const redeemCoupon = (data) => {
  const url = `https://chatgptmall.tech/api/v1/coupon/redeem/`;
  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const savePurchaseItem = (data) => {
  const url = `https://chatgptmall.tech/api/v1/purchases/`;
  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw new Error(e);
    });
};
export const updateItem = (params) => {
  const url = `https://chatgptmall.tech/api/v1/purchases/`;
  return axios
    .put(url,null, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
