import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import store, { persistor } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import Invoices from './pages/Invoices';
import Savings from './pages/Savings';
import Spendings from './pages/Spendings';
import RegisterUser from './pages/RegisterUser';
import NotFound from './pages/NotFound';
import Account from './pages/Account';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register-user" element={<RegisterUser />} />
              <Route path="/spendings" element={<Spendings />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="/account" element={<Account />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer autoClose={3000} />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
