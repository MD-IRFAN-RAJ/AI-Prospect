import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";

import "./styles/theme.css";
import "./styles/globals.css";
import "./styles/glass.css";
import "./styles/animations.css";
import "./styles/utilities.css";
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider, ThemeProvider } from './providers';

import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
