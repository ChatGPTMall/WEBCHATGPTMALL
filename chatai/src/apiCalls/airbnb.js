import axios from "axios";
const airBnbApiKey="81af834222mshd8eecd103ea35fap137f84jsnb3229611d675"
export const getLanguages = async () => {
  const url = "https://airbnb19.p.rapidapi.com/api/v1/getLanguages";
  const options = {
    headers: {
      "X-RapidAPI-Key": airBnbApiKey,
      "X-RapidAPI-Host": "airbnb19.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.get(url, options);
    const newData = data?.data?.map(({ id, title }) => {
      return { label: title, value: id };
    });
    return newData
  } catch (error) {
    console.error(error);
  }
};
export const getCategory = async () => {
  const url = "https://airbnb19.p.rapidapi.com/api/v1/getCategory";
  const options = {
    headers: {
      "X-RapidAPI-Key": airBnbApiKey,
      "X-RapidAPI-Host": "airbnb19.p.rapidapi.com",
    },
  };

  try {
    const {data} = await axios.get(url, options);
    const newData = data?.data?.map(({ id, title }) => {
      return { label: title, value: id };
    });
    return newData
  } catch (error) {
    console.error(error);
  }
};
export const getCurrency = async () => {
  const url = "https://airbnb19.p.rapidapi.com/api/v1/getCurrency";
  const options = {
    headers: {
      "X-RapidAPI-Key": airBnbApiKey,
      "X-RapidAPI-Host": "airbnb19.p.rapidapi.com",
    },
  };

  try {
    const {data} = await axios.get(url, options);
    console.log(data)
    const newData = data?.data?.map(({ id, title }) => {
      return { label: title, value: id };
    });
    return newData
  } catch (error) {
    console.error(error);
  }
};
export const searchProperty = async (params) => {
  const url = "https://airbnb19.p.rapidapi.com/api/v1/searchProperty";
  const options = {
    params,
    headers: {
      "X-RapidAPI-Key": airBnbApiKey,
      "X-RapidAPI-Host": "airbnb19.p.rapidapi.com",
    },
  };

  try {
    const {data} = await axios.get(url, options);
   console.log(data)
    return data.data
    
    console.log(data)
  } catch (error) {
    console.error(error);
  }
};
