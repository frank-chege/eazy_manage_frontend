import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/tailwind.css";
import FetchEmployeeContextProvider from "./pages/contexts/FetchEmployeesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FetchEmployeeContextProvider>
    <App />
  </FetchEmployeeContextProvider>
);
