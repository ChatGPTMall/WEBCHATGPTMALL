import axios from "axios";
const BaseUrl = "https://chatgptmall.tech/api/v1/";
export const getRoomItems = (apiUrl, roomId) => {
  const url = BaseUrl + apiUrl;
  return axios
    .get(url, {
      params: {
        room_id: roomId,
      },
    })
    .then(({ data }) => {
      return data.results.map((item, index) => {
        return {
          key: index,
          image: item.image,
          title: item.name,
          category: item.category,
          description: item.description,
          price: `${item.price}$`,
        };
      });
    })
    .catch((e) => {
       new Error(e.message);
    });
};
