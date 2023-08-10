import axios from "axios";

class ocrImageDetails {
  static async getImageText (url) {
    const apiUrl = "https://chatgptmall.tech/api/v1/room/image/url/ocr/"
    const params = {
      image_url: url
    };
    try {
      const res = await axios.post(apiUrl, params);
      return res.data.response
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
 static async getTranslatedText  (selectedLanguage, inputText) {
  const encodedParams = new URLSearchParams();
      encodedParams.set('source_language', 'zh-CN');
      encodedParams.set('target_language', selectedLanguage);
      encodedParams.set('text', inputText);
  
  const options = {
    method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: encodedParams,
  };
  
  try {
    const response = await axios.request(options);
    
    return response.data.data.translatedText
  } catch (error) {
    console.error(error);
  }
}
}

export default ocrImageDetails

