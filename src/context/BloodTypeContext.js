import React, { createContext, useState } from 'react';

export const BloodTypeContext = createContext();

export const BloodTypeProvider = ({ children }) => {
  const [bloodType, setBloodType] = useState('1'); // Presetăm cu o valoare implicită

  return (
    <BloodTypeContext.Provider value={{ bloodType, setBloodType }}>
      {children}
    </BloodTypeContext.Provider>
  );
};
