import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext'; // <-- IMPORTAR

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioProvider> {/* <-- ENVOLVER LA APP */}
        <App />
      </AudioProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
