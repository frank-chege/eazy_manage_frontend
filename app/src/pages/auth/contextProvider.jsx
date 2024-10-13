//context provider
import React, { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  //initialize state with local storage
  const [loginRole, setLoginRole] = useState(() => {
    return localStorage.getItem("loginRole") || "viewer";
  });
  //sync state with local storage
  useEffect(() => {
    localStorage.setItem("loginRole", loginRole);
  }, [loginRole]);

  return (
    <GlobalContext.Provider value={{ loginRole, setLoginRole }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalContextProvider;
