const axios = require("axios");

const api = axios.create({
  baseURL: "https://web-production-a016.up.railway.app/apiv1/",
  timeout: 12000,
});

export default api;
