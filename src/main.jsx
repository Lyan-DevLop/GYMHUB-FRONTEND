import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Busca el elemento root en tu index.html
const container = document.getElementById('root');

// Verifica que exista antes de crear el root
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento #root en index.html");
}
