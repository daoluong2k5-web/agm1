import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RentalProvider, useRental } from './context/RentalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MotorbikeListPage from './pages/MotorbikeListPage';
import MotorbikeDetailPage from './pages/MotorbikeDetailPage';
import RentalListPage from './pages/RentalListPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFound from './pages/NotFound';
import './App.css';

// Toast Notification Banner
const NotificationToast = () => {
  const { notification, setNotification } = useRental();
  if (!notification) return null;

  return (
    <div className={`notification-toast ${notification.type}`}>
      <span className="toast-text">{notification.message}</span>
      <button
        type="button"
        className="toast-close"
        onClick={() => setNotification(null)}
      >
        ✕
      </button>
    </div>
  );
};

function App() {
  return (
    <RentalProvider>
      <BrowserRouter>
        <div className="app-layout">
          <NotificationToast />
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bikes" element={<MotorbikeListPage />} />
              <Route path="/products" element={<MotorbikeListPage />} />
              <Route path="/bikes/:id" element={<MotorbikeDetailPage />} />
              <Route path="/products/:id" element={<MotorbikeDetailPage />} />
              <Route path="/rental-list" element={<RentalListPage />} />
              <Route path="/cart" element={<RentalListPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </RentalProvider>
  );
}

export default App;
