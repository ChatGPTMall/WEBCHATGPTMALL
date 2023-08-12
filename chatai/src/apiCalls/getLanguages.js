import axios from 'axios';

export const getLanguages = async () => {
  const options = {
    method: 'GET',
    url: 'https://translate-plus.p.rapidapi.com/',
    headers: {
      'X-RapidAPI-Key': '3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9',
      'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    return response.data.supported_languages
  } catch (error) {
    console.error(error);
  }
}