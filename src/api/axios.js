import axios from 'axios';
import { getAuthToken } from '../utils/auth'; // Funcție pentru a obține token-ul JWT

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // URL-ul corect pentru API
  timeout: 10000, // Timeout de 10 secunde
});

// Interceptor pentru a adăuga token-ul JWT la cereri
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Interceptor Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor pentru gestionarea erorilor din răspuns
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || 'An error occurred. Please try again.';
    console.error('Interceptor Response Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;