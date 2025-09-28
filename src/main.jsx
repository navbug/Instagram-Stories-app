import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StoriesProvider from "./context/StoriesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoriesProvider>
      <App />
    </StoriesProvider>
  </StrictMode>
);
