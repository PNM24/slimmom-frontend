import axiosInstance from './axios';

// Funcție pentru obținerea produselor nerecomandate și aportului caloric zilnic
export const getDailyIntake = async params => {
  try {
    const response = await axiosInstance.get('/products/daily-intake', {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
