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

  async WechatLogin({ otp }) {
    const response = await axios.post(`${apiUrl}/v1/wechat/login/`, {
      otp: otp
    });
    return response;
  }

  async WhapappLogin({ otp }) {
    const response = await axios.post(`${apiUrl}/v1/whatsapp/login/`, {
      otp: otp
    });
    return response;
  }



  async Feature() {
    const getFeature = await axios.get(`${apiUrl}/v1/home/feature/`);
    return getFeature;
  }

  async postItems(formData) {
    // console.log(formData, "check point 1");
    const response = await axios.post(`${apiUrl}/v1/shop/items/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
  async uploadImage(formData) {
    const response = await axios.post(
      `${apiUrl}/v1/room/text_to_text/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}

export const apiClient = new ApiClient();
