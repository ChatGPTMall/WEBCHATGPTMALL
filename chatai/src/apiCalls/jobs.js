import axios from 'axios';
export const getJobs=async(data)=>{

 const  url='https://linkedin-jobs-search.p.rapidapi.com/'
const options = {
 
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '81af834222mshd8eecd103ea35fap137f84jsnb3229611d675',
    'X-RapidAPI-Host': 'linkedin-jobs-search.p.rapidapi.com'
  },
 
};
try {
	const response = await axios.post(url,data,options);
  console.log(response.data)
	return response.data.map((job)=>{
return {...job, company_name:{name:job.company_name,link:job.company_url}}
  });
} catch (error) {
	console.error(error);
}
}