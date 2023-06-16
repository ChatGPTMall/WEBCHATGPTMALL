import axios from "axios";
const BaseUrl = "https://chatgptmall.tech/api/v1/";
export const getRoomItems = (apiUrl, params) => {
  const url = BaseUrl + apiUrl;
  return axios
    .get(url, {
      params: {
        room_id: params.roomId,
        search:params.search,
        ordering:params.sort,
        // is_private:params.isPrivate
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
