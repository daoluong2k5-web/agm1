import React from 'react';
import { Link } from 'react-router-dom';
import { useRental } from '../context/RentalContext';

const MotorbikeCard = ({ bike }) => {
  const { addToRental } = useRental();
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(bike.pricePerDay || bike.price) + '₫/ngày';

  return (
    <div className="motorbike-card">
      <div className="card-image-wrapper">
        <img
          src={bike.image}
          alt={bike.name}
          className="bike-image"
          loading="lazy"
          onError={(e) => {
            // Fallback placeholder if image fails to load
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {bike.status && <span className="status-badge">{bike.status}</span>}
        <span className="category-pill">{bike.category}</span>
      </div>

      <div className="card-body">
        <div className="card-header-info">
          <h3 className="bike-name" title={bike.name}>
            <Link to={`/bikes/${bike.id}`}>{bike.name}</Link>
          </h3>
          <div className="bike-rating">
            <span className="star-icon">★</span>
            <span className="rating-val">{bike.rating || '4.8'}</span>
          </div>
        </div>

        <div className="bike-specs-tags">
          <span className="spec-tag">⚙️ {bike.engine}</span>
          <span className="spec-tag">⛽ {bike.transmission || 'Tự động'}</span>
          <span className="spec-tag">🏷️ {bike.brand}</span>
        </div>

        <p className="bike-desc-preview">{bike.description}</p>

        <div className="card-footer-action">
          <div className="price-block">
            <span className="price-label">Giá thuê:</span>
            <span className="price-amount">{formattedPrice}</span>
          </div>

          <div className="btn-group-action">
            <Link to={`/bikes/${bike.id}`} className="btn-detail-link">
              Chi tiết
            </Link>
            <button
              type="button"
              className="btn-rent-now"
              onClick={() => addToRental(bike, 1)}
            >
              + Chọn thuê
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorbikeCard;
