import axios from 'axios';

export const detectTextLanguage = async(text) => {
const options = {
  method: 'POST',
  url: 'https://translate-plus.p.rapidapi.com/language_detect',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9',
    'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
  },
  data: {
    text: text
  }
};

try {
	const response = await axios.request(options);
	return response.data.language_detection.language
} catch (error) {
	console.error(error);
}
}
