// src/context/ConsumedProductsContext.js
import React, { createContext, useState } from 'react';

export const ConsumedProductsContext = createContext();

export const ConsumedProductsProvider = ({ children }) => {
  const [consumedProducts, setConsumedProducts] = useState([]);

  return (
    <ConsumedProductsContext.Provider
      value={{ consumedProducts, setConsumedProducts }}
    >
      {children}
    </ConsumedProductsContext.Provider>
  );
};
