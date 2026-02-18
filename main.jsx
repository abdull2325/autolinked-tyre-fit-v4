import React from 'react';
import { createRoot } from 'react-dom/client';
import TyreFitApp from './tyre-fit-v4-app.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TyreFitApp />
  </React.StrictMode>
);
