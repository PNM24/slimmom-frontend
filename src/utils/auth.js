// utils/auth.js
export const getAuthToken = () => {
  return localStorage.getItem('token'); // Presupunem că token-ul este stocat în localStorage
};
