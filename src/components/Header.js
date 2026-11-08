import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useRental } from '../context/RentalContext';

const Header = () => {
  const { totalBikes } = useRental();

  return (
    <header className="site-header sticky-top">
      <div className="header-container">
        <Link to="/" className="site-brand">
          <span className="brand-icon">🏍️</span>
          <span className="brand-text">Moto<span className="brand-accent">Rental</span></span>
        </Link>

        <nav className="site-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/bikes"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Danh sách xe
          </NavLink>
          <NavLink
            to="/rental-list"
            className={({ isActive }) => (isActive ? 'nav-link active nav-cart-btn' : 'nav-link nav-cart-btn')}
          >
            <span>🛒 Xe đã chọn</span>
            {totalBikes > 0 && <span className="cart-badge">{totalBikes}</span>}
          </NavLink>
        </nav>

        <div className="header-contact d-none d-md-flex align-items-center">
          <span className="phone-icon">📞</span>
          <div>
            <div className="contact-label">Hotline 24/7</div>
            <a href="tel:0988123456" className="contact-number">0988.123.456</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
