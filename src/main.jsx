import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameProvider } from "./context/GameContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>
);
