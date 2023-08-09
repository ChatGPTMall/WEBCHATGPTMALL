import axios from "axios";



export const ocrImageDetails = async (url) => {
  const apiUrl = "https://chatgptmall.tech/api/v1/room/image/url/ocr/"
  const params = {
    image_url: url
  };
  try {
    const res = await axios.post(apiUrl, params);
      return res.data.response;

  } catch (err) {
    throw new Error(err.message);
  }
};