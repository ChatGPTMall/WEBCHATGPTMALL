import axios from 'axios';
export const upworkjobsapi=async(jobTitle)=>{
const options = {
  method: 'GET',
  url: 'https://upwork-api2.p.rapidapi.com/jobs',
  params: {
    keyword: jobTitle,
    offset: 0,
    count: 50
  },
  headers: {
    'X-RapidAPI-Key': '81af834222mshd8eecd103ea35fap137f84jsnb3229611d675',
    'X-RapidAPI-Host': 'upwork-api2.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);  
  return response.data.data
} catch (error) {
	console.error(error);
}
}
