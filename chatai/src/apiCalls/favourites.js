import axios from "axios";
const url = "https://chatgptmall.tech/api/v1/favourites/room/";
export const getFavourites = ({room_key}) => {
 return axios
    .get(url,{
        params:{
            room_key
        }
    } )
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
export const addFavourites = (data) => {
  return axios
     .post(url,data )
     .then((data) => {
       return data;
     })
     .catch((e) => {
       throw new Error(e);
     });
 };
 export const removeFavourites = (params) => {
  return axios
     .delete(url,{params} )
     .then((data) => {
       return data;
     })
     .catch((e) => {
       throw new Error(e);
     });
 };