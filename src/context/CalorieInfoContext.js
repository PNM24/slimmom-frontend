import React, { createContext, useState } from 'react';

export const CalorieInfoContext = createContext();

const CalorieInfoProvider = ({ children }) => {
  const [calorieInfo, setCalorieInfo] = useState(null);

  return (
    <CalorieInfoContext.Provider value={{ calorieInfo, setCalorieInfo }}>
      {children}
    </CalorieInfoContext.Provider>
  );
};

export default CalorieInfoProvider;
