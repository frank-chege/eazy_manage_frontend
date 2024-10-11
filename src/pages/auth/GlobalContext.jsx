//create a global state to manage login status
import React, { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  //initialize state with local storage
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("email") || "";
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "public";
  });
  //sync state with local storage
  useEffect(() => {
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
  }, [email, role]);

  return (
    <GlobalContext.Provider value={{ email, setEmail, role, setRole }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalContextProvider;
