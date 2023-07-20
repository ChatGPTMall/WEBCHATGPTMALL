import axios from "axios";

export const getRegions = async () => {
  const url =
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/regions/list";
  try {
    const response = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": "0c81d60466msh87a02568de77566p18e24djsna8ac9498c509",
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
    });

    let allCountries = [];
    response.data.map((region) => {
      region.countries.map((c)=>{
        allCountries.push(c)
      });
    });
    return allCountries.map((country)=>{
        return {label:country.name,value:country.code}
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = async (catg) => {
    const options = {
        params: {
          lang: 'en',
          country: catg
        },
        headers: {
          'X-RapidAPI-Key': '0c81d60466msh87a02568de77566p18e24djsna8ac9498c509',
          'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
      };

    const url ='https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list';
    try {
      const response = await axios.get(url,options);
  return response.data.map((category)=>{
    return {label:category.CatName,value:category.CategoryValue}
});
      
    } catch (error) {
      console.error(error);
    }
  };
  export const getProducts = async (country,category) => {
    const options = {
        params: {
            country,
            lang: 'en',
            // currentpage: '0',
            // pagesize: '30',
            categories: category,
            // concepts: 'H&M MAN'
        },
        headers: {
          'X-RapidAPI-Key': '0c81d60466msh87a02568de77566p18e24djsna8ac9498c509',
          'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
      };

    const url ='https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list'
    try {
      const response = await axios.get(url,options);
  return response.data
    } catch (error) {
      console.error(error);
    }
  };
  
  
  