import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/tailwind.css";
import GlobalContextProvider from "./pages/auth/contextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
  //</React.StrictMode>
);
