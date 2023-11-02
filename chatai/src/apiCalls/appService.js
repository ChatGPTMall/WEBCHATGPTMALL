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
}

export const apiClient = new ApiClient();
