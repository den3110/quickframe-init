import axios from 'axios';
// config
const API_URL = "http://dovio.bo";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
