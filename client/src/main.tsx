import { initThemeMode } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MainProvider } from "./context/MainProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainProvider>
      <BrowserRouter>
        <ThemeInit />
        <App />
      </BrowserRouter>
    </MainProvider>
  </StrictMode>,
);

initThemeMode();
