const axios = require('axios');

const api = axios.create({
    baseURL: "https://pure-falls-26749.herokuapp.com/apiv1/",
    timeout: 12000
});

export default api;