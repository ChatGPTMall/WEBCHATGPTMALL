import axios from 'axios' 

export const getTranslatedText   = async (selectedLanguage, inputText) => {
  const encodedParams = new URLSearchParams();
      encodedParams.set('source_language', selectedLanguage);
      encodedParams.set('target_language', 'zh-CN');
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