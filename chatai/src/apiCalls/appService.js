import axios from "axios";

// auth
const apiUrl = "https://chatgptmall.tech/api";
class ApiClient {
  async Login({ email, password }) {
    const response = await axios.post(`${apiUrl}/v2/login/`, {
      username: email,
      password: password,
    });
    return response;
  }

  async Feature() {
    const getFeature = await axios.get(`${apiUrl}/v1/home/feature/`);
    return getFeature;
  }

  async postItems({ category, title, price, selectedCommunities, pic }) {
    const response = await axios.post(
      `${apiUrl}/v1/shop/items/`,
      {
        category: category,
        title: title,
        communities: selectedCommunities,
        price: price,
        image: pic,
      }
      // {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      // }
    );
    return response;
  }
}

export const apiClient = new ApiClient();
