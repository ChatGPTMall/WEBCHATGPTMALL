import axios from "axios";

const apiKey = "S7GSPXFMVEW4Y4T8YPYY8JCRWFAPGVB6VT";
const formatTimeStamp=(timestamp)=>{
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    return `${day} ${month} , ${year} ${hours}:${minutes.toString().padStart(2, '0')}`;
}
export const getEtherBalance = async (address) => {
  const url = "https://api.etherscan.io/api";
  try {
    const response = await axios.get(url, {
      params: {
        apiKey: apiKey,
        module: "account",
        action: "balancemulti",
        tag: "latest",
        address,
      },
    });
    
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getEtherDetail = async (address) => {
  const url = "https://api.etherscan.io/api";
  try {
    const response = await axios.get(url, {
      params: {
        apiKey: apiKey,
        module: "account",
        action: "txlist",
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10,
        sort: "asc",

        address,
      },
    });
    
    return response?.data?.result.map((item) => {
      return {
        blockNumber: item.blockNumber,

        timeStamp:formatTimeStamp( item.timeStamp),

        gas: item.gas,

        gasPrice: item.gasPrice,

        gasUsed: item.gasUsed,
      };
    });
  } catch (error) {
    console.error(error);
  }
};
