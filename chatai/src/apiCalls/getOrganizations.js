import axios from "axios";
const BaseUrl = "https://chatgptmall.tech/api/v1/organizations/";
export const getOrganizations = ( params) => {
 
  return axios
    .get(BaseUrl)
    .then(({ data }) => {
      
return data.results
    })
    .catch((e) => {
       new Error(e.message);
    });
};
