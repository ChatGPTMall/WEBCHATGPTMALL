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
export const getNetworkGrowthItems=(nID) => {
  const url = `https://chatgptmall.tech/api/v1/growth_network/${nID}/`;
return axios
.get(url)
  .then((data) => {
    return data
  })
  .catch((e) => {
    throw new Error(e);
  });
};
export const getCatAndBanks=() => {
  const url = `https://chatgptmall.tech/api/v1/filters/`;
return axios
.get(url)
  .then((data) => {
    return data
  })
  .catch((e) => {
    throw new Error(e);
  });
};
//https://chatgptmall.tech/api/v1/filters/
//https://chatgptmall.tech/api/v1/growth_network/%7Bnetwork_id%7D/capability/upload/
export const uploadCapability=(data,params) => {
  const url = `https://chatgptmall.tech/api/v1/items/`;
return axios
.post(url,data,{headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  params
  })
  .then((data) => {
    return data
  })
  .catch((e) => {
    throw new Error(e);
  });
};