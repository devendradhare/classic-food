import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./contextAPI/AppContextProvider.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>
);
