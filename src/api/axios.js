import axios from 'axios';
import { getAuthToken } from '../utils/auth'; // Funcție pentru obținerea token-ului

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000', // URL fallback pentru dezvoltare locală
});

// Interceptor pentru cereri: Adaugă token-ul JWT în header-ul Authorization
axiosInstance.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor pentru răspunsuri: Gestionează erorile globale
axiosInstance.interceptors.response.use(
  response => response, // Returnează răspunsul dacă este valid
  error => {
    if (error.response?.status === 401) {
      // Gestionare token expirat sau nevalid
      localStorage.removeItem('authToken'); // Șterge token-ul JWT
      window.location.href = '/login'; // Redirecționează la pagina de login
    }
    return Promise.reject(error); // Propagă eroarea pentru gestionare locală
  }
);

export default axiosInstance;
