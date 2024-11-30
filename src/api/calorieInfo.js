import axiosInstance from './axios';

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

export const saveCalorieInfo = async calorieInfo => {
  try {
    const response = await axiosInstance.post(
      '/save-calorie-info',
      calorieInfo
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
