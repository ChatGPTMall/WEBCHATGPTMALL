import axios from "axios";
const BaseUrl = "https://chatgptmall.tech/api/v1/";
export const getRoomItems = (apiUrl, params) => {
  const url = BaseUrl + apiUrl;
  return axios
    .get(url, {
      params: {
        room_key: params.roomKey,
        search:params.search,
        ordering:params.sort,
        is_private:params.isPrivate?1:0
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
