import axios from "axios";

export const getRegions = async () => {
  const url =
    "https://global-zip-codes-with-lat-and-lng.p.rapidapi.com/api/v1/country";
  try {
    const response = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": "3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9",
        "X-RapidAPI-Host": "global-zip-codes-with-lat-and-lng.p.rapidapi.com",
      },
    });
    return response.data.data.map((country) => {
      return { label: country.country, value: country.code };
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = async (catg) => {
  const options = {
    params: {
      lang: "en",
      country: catg,
    },
    headers: {
      "X-RapidAPI-Key": "0c81d60466msh87a02568de77566p18e24djsna8ac9498c509",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  const url =
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list";
  try {
    const response = await axios.get(url, options);
    return response.data.map((category) => {
      return { label: category.CatName, value: category.CategoryValue };
    });
  } catch (error) {
    console.error(error);
  }
};
export const getProducts = async (country, category) => {
  const options = {
    params: {
      country,
      lang: "en",
      // currentpage: '0',
      // pagesize: '30',
      categories: category,
      // concepts: 'H&M MAN'
    },
    headers: {
      "X-RapidAPI-Key": "0c81d60466msh87a02568de77566p18e24djsna8ac9498c509",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  const url =
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list";
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTaoBaoProducts = async (q) => {
  const options = {
    params: {
      // country,
      q,
      api: "item_search",

      // concepts: 'H&M MAN'
    },
    headers: {
      "X-RapidAPI-Key": "3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9",
      "X-RapidAPI-Host": "taobao-api.p.rapidapi.com",
    },
  };

  const url = "https://taobao-api.p.rapidapi.com/api";
  try {
    const response = await axios.get(url, options);
    return {
      results: response.data.result.item,
    };
  } catch (error) {
    console.error(error);
  }
};
export const getTaoBaoProductDetails = async (id) => {
  const options = {
    params: {
      api: "item_detail_simple",
      num_iid: id,

      // concepts: 'H&M MAN'
    },
    headers: {
      "X-RapidAPI-Key": "81af834222mshd8eecd103ea35fap137f84jsnb3229611d675",
      "X-RapidAPI-Host": "taobao-api.p.rapidapi.com",
    },
  };

  const url = "https://taobao-api.p.rapidapi.com/api";
  try {
    const response = await axios.get(url, options);

    return response.data.result.item;
  } catch (error) {
    console.error(error);
  }
};
