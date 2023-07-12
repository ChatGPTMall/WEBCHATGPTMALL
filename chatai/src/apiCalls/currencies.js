import axios from "axios";

export const getCurrencies = async () => {
  const url = "https://currency-converter-pro1.p.rapidapi.com/currencies";
  try {
    const response = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": "3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9",
        "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
      },
    });
    let modifiedData =[]
     Object.keys(response.data.result).forEach((key) => {
      if (key !== "VEF") {
        modifiedData.push( {key,value:response.data.result[key]});
      }
    });
    return modifiedData;
  } catch (error) {
    console.error(error);
  }
};
export const getCurrencyRates = async (base, allCur) => {
  const url = "https://currency-converter-pro1.p.rapidapi.com/latest-rates";
  try {
    const response = await axios.get(url, {
      params: {
        base: base,
        currencies: allCur,
      },
      headers: {
        "X-RapidAPI-Key": "3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9",
        "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
      },
    });
    let data = {};
    const res = Object.keys(response.data.result)?.map((key) => {
      return {
        currency: `${base} / ${key}`,
        rate: `${response.data.result[key]?.toFixed(2)} ${key}`,
      };
    });
    data["currencies"] = res;
    data["date"]=response.data.date
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const curCalculate = async (from,to,amount) => {
  const url = "https://currency-converter-pro1.p.rapidapi.com/convert";
  try {
    const response = await axios.get(url, {
      params: {
        from,
        to,
        amount
      },
      headers: {
        'X-RapidAPI-Key': '3ec1eef879msh365ea5d96552e49p15a7e9jsn95f1d7c21fd9',
        'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
      }
    });
    return response.data
    
  } catch (error) {
    console.error(error);
  }
};

