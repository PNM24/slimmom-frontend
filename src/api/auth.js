import axiosInstance from './axios';

// Funcție pentru gestionarea erorilor
const handleError = error => {
  const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
  throw new Error(errorMessage);
};

// Funcție pentru înregistrare
export const register = async userData => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Funcție pentru verificare OTP
export const verifyOTP = async verificationData => {
  try {
    const response = await axiosInstance.post('/auth/verify-otp', verificationData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Funcție pentru retrimitere OTP
export const resendOTP = async emailData => {
  try {
    const response = await axiosInstance.post('/auth/resend-otp', emailData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Funcție pentru autentificare
export const login = async userData => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Funcție pentru delogare
export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Funcție pentru verificarea autentificării
export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('/auth/check');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
