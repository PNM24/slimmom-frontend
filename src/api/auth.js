import axiosInstance from './axios';

// Funcție pentru gestionarea erorilor
const handleError = error => {
  console.error('API Error:', error.response || error.message); // Logarea erorii pentru debugging
  const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again later.';
  throw new Error(errorMessage);
};

// Funcție pentru înregistrare
export const register = async userData => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data; // Returnează datele din răspuns
  } catch (error) {
    handleError(error); // Gestionează eroarea
  }
};

// Funcție pentru verificare OTP
export const verifyOTP = async verificationData => {
  try {
    const response = await axiosInstance.post('/auth/verify-otp', verificationData);
    return response.data; // Returnează datele din răspuns
  } catch (error) {
    handleError(error); // Gestionează eroarea
  }
};

// Funcție pentru retrimitere OTP
export const resendOTP = async emailData => {
  try {
    const response = await axiosInstance.post('/auth/resend-otp', emailData);
    return response.data; // Returnează datele din răspuns
  } catch (error) {
    handleError(error); // Gestionează eroarea
  }
};

// Funcție pentru autentificare
export const login = async userData => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    return response.data; // Returnează datele din răspuns
  } catch (error) {
    handleError(error); // Gestionează eroarea
  }
};

// Funcție pentru delogare
export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data; // Returnează datele din răspuns
  } catch (error) {
    handleError(error); // Gestionează eroarea
  }
};

// Funcție pentru verificarea autentificării
export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('/auth/check');
    return response.data; // Returnează datele din răspuns
  } catch (error) {
    handleError(error); // Gestionează eroarea
  }
};
