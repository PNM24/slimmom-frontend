import axios from 'axios';
import { getAuthToken } from '../utils/auth'; //  funcție pentru a obține token-ul JWT

const axiosInstance = axios.create({
  baseURL: 'https://slimmom-backend-v2.onrender.com',
});

axiosInstance.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;