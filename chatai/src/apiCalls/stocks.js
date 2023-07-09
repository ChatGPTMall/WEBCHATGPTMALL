import axios from "axios";
const url1 =
'https://twelve-data1.p.rapidapi.com/stocks'
const url2 =
'https://twelve-data1.p.rapidapi.com/time_series'
export const getStocks = async () => {
  try {
    const res = await axios.get(url1, {
      params: {
        country: 'United States',
        format: 'json'
      },
      headers: {
        'X-RapidAPI-Key': '3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    });
    console.log(res)
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const getStockDetails = async ({symbol,interval}) => {
  try {
    const res = await axios.get(url2, {
      params: {
        symbol: symbol,
        interval: interval,
        outputsize: '30',
        format: 'json'
      },
      headers: {
        'X-RapidAPI-Key': '3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    });
    console.log(res)
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
