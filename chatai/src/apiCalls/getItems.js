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
          key: item.id,
          id:item.id,
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
export const getRoomItemsWithType = (apiUrl, params,type) => {
  const url = `https://chatgptmall.tech/api/v2/` + apiUrl;
  return axios
    .get(url, {
      params: {
        listing:type,
      },
    })
    .then(({ data }) => {
      return data.map((item, index) => {
        return {
          key: item.item_id,
          id:item.item_id,
          image: item.image,
          title: item.title,
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

export const uploadCommunityItemsV2 = (data, params) => {
  const url = `https://chatgptmall.tech/api/v2/community/items/`;
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