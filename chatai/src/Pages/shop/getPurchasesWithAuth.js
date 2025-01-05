import axios from 'axios';

export const getPurchasesWithAuth = () => {
  const url = 'https://chatgptmall.tech/api/v1/purchases/';

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      // Usually, you want to return response.data
      return response.data;
    })
    .catch((error) => {
      console.error('API call error:', error);
      throw error;
    });
};
