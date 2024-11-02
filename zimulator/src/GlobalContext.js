// GlobalContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context
const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(0); // Initial value

  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
