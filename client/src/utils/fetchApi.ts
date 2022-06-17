import axios from 'axios';

const fetchAPI = (url: string, method: string, body?: {}, token?: string) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token ? token : '',
  };
  return axios({
    url,
    method,
    data: body,
    headers,
  })
    .then((response) => response)
    .catch((error) => {
      // console.log(error);
      throw error;
    });
};

export default fetchAPI;
