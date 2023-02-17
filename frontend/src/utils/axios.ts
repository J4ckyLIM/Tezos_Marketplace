import Axios from 'axios';

const axiosConfig = {
  timeout: 5000,
};

const mutableAxiosInstance = Axios.create(axiosConfig);

mutableAxiosInstance.interceptors.response.use(
  response => response,
  async error =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong',
    ),
);

const axios = mutableAxiosInstance;

export default axios;
