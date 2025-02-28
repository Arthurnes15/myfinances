import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import Savings from './pages/Savings/index.jsx';
import Bills from './pages/Bills/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/savings" element={<Savings />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
