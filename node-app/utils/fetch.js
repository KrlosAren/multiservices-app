const axios = require('axios');

const fecthApi = ({ url, method, body }) => {
    return axios({
        url,
        method,
        data: body || {},
    });
};

module.exports = {
    fecthApi,
};