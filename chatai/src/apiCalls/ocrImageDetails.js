import axios from "axios";

class ocrImageDetails {
  static async getImageText (url) {
    const apiUrl = "https://chatgptmall.tech/api/v1/room/image/url/ocr/"
    const params = {
      image_url: url
    };
    try {
      const res = await axios.post(apiUrl, params);
      return res.data
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
 static async getTranslatedText  (selectedLanguage, inputText) {
      let data = {
          q : inputText,
          source: 'en',
          target: selectedLanguage
      }
     const response =  await axios.post(`https://libretranslate.de/translate`, data)
          return response.data
}
}

export default ocrImageDetails

