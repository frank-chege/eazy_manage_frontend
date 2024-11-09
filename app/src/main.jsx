import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/tailwind.css";
import FetchEmployeeContextProvider from "./pages/contexts/FetchEmployeesContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FetchEmployeeContextProvider>
    <Router>
      <App />
    </Router>
  </FetchEmployeeContextProvider>
);
