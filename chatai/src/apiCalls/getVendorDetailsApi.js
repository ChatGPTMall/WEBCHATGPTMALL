import axios from 'axios';
const getVendorDetailsApi = async (id) => {

const options = {
  method: 'GET',
  url: 'https://otapi-jd.p.rapidapi.com/GetVendorInfo',
  params: {
    language: 'en',
    vendorId: id
  },
  headers: {
    'X-RapidAPI-Key': '81af834222mshd8eecd103ea35fap137f84jsnb3229611d675',
    'X-RapidAPI-Host': 'otapi-1688.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
  return response.data.VendorInfo
} catch (error) {
}
}
export default getVendorDetailsApi