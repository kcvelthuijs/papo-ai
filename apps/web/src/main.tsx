import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@workspace/ui/globals.css";
import { App } from "./App.tsx";
import { ThemeProvider } from "./Components/theme-provider.tsx";

import { initAudioBridge } from "./InitAudio";
initAudioBridge();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
