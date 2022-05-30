import axios from 'axios';

const fetchAPI = (url: string, method: string, body?: {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  console.log(url, method, body);

  return axios({
    url,
    method,
    data: body,
    headers,
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default fetchAPI;
