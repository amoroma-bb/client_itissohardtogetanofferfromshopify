import React from 'react';
import ReactDOM from 'react-dom/client';
import ClientRoutes from './Routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClientRoutes />
  </React.StrictMode>
);

