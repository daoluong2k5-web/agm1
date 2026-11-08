import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import motorbikes from '../data/motorbikes';
import { useRental } from '../context/RentalContext';

const MotorbikeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToRental } = useRental();
  const [rentalDays, setRentalDays] = useState(1);

  const bike = motorbikes.find((b) => b.id === parseInt(id, 10));

  if (!bike) {
    return (
      <div className="detail-error-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Xe máy không tồn tại</h2>
          <p>Không tìm thấy xe máy với mã ID: <strong>{id}</strong></p>
          <Link to="/bikes" className="btn-back-action">
            ← Quay lại danh sách xe
          </Link>
        </div>
      </div>
    );
  }

  const pricePerDay = bike.pricePerDay || bike.price || 0;
  const formattedPricePerDay = new Intl.NumberFormat('vi-VN').format(pricePerDay) + '₫/ngày';
  const calculatedTotal = pricePerDay * rentalDays;
  const formattedCalculatedTotal = new Intl.NumberFormat('vi-VN').format(calculatedTotal) + '₫';

  const handleAddAndStay = () => {
    addToRental(bike, rentalDays);
  };

  const handleAddAndGoToCart = () => {
    addToRental(bike, rentalDays);
    navigate('/rental-list');
  };

  return (
    <div className="detail-page-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <Link to="/">Trang chủ</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/bikes">Danh sách xe</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{bike.name}</span>
      </nav>

      <div className="detail-layout">
        {/* Left Column: Image & Badges */}
        <div className="detail-image-column">
          <div className="detail-image-card">
            <img
              src={bike.image}
              alt={bike.name}
              className="detail-large-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {bike.status && <span className="detail-status-pill">{bike.status}</span>}
          </div>

          {/* Quick Perks */}
          <div className="perks-card">
            <h4 className="perks-heading">Quyền lợi khi thuê xe:</h4>
            <ul className="perks-list">
              <li>🪖 Miễn phí 02 nón bảo hiểm đạt chuẩn chất lượng</li>
              <li>🌧️ Tặng kèm 02 áo mưa tiện lợi khi nhận xe</li>
              <li>📱 Giá đỡ điện thoại chắc chắn gắn sẵn trên xe</li>
              <li>🔧 Hỗ trợ cứu hộ kỹ thuật 24/7 trên toàn thành phố</li>
              <li>🧼 Xe được rửa sạch sẽ và bảo dưỡng trước khi giao</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Information, Specs & Rental Calculator */}
        <div className="detail-info-column">
          <div className="detail-header-block">
            <div className="category-tag-row">
              <span className="brand-tag">{bike.brand}</span>
              <span className="category-tag">{bike.category}</span>
              <span className="rating-tag">★ {bike.rating || '4.8'}</span>
            </div>

            <h1 className="detail-bike-title">{bike.name}</h1>
            <p className="detail-bike-desc">{bike.description}</p>
          </div>

          {/* Price Highlight */}
          <div className="detail-price-box">
            <div className="price-main">
              <span className="price-tag-label">Giá thuê theo ngày:</span>
              <span className="price-tag-value">{formattedPricePerDay}</span>
            </div>
            <div className="deposit-info">
              <span>Tiền cọc:</span> <strong>{bike.deposit || '1.000.000₫ hoặc CCCD'}</strong>
            </div>
          </div>

          {/* Specification Grid */}
          <div className="specs-section">
            <h3 className="section-small-title">Thông số kỹ thuật chi tiết</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Dung tích xi lanh:</span>
                <span className="spec-value">{bike.engine}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Loại hộp số:</span>
                <span className="spec-value">{bike.transmission || 'Tự động'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Mức tiêu thụ xăng:</span>
                <span className="spec-value">{bike.fuel}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Hãng sản xuất:</span>
                <span className="spec-value">{bike.brand}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Phân khúc xe:</span>
                <span className="spec-value">{bike.category}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Tình trạng xe:</span>
                <span className="spec-value text-success">Đời mới, sẵn sàng giao</span>
              </div>
            </div>
          </div>

          {/* Rental Days & Subtotal Calculator */}
          <div className="rental-calculator-card">
            <h3 className="calc-title">Tạm tính tiền thuê</h3>
            <div className="calc-row">
              <label htmlFor="rentalDaysInput" className="calc-label">
                Số ngày dự kiến thuê:
              </label>
              <div className="days-counter">
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => setRentalDays((d) => Math.max(1, d - 1))}
                  disabled={rentalDays <= 1}
                >
                  -
                </button>
                <input
                  id="rentalDaysInput"
                  type="number"
                  min="1"
                  max="90"
                  className="days-input"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value, 10) || 1))}
                />
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => setRentalDays((d) => d + 1)}
                >
                  +
                </button>
                <span className="days-unit">ngày</span>
              </div>
            </div>

            <div className="calc-total-row">
              <span className="calc-total-label">Tổng tiền dự kiến ({rentalDays} ngày):</span>
              <span className="calc-total-value">{formattedCalculatedTotal}</span>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-group">
              <button
                type="button"
                className="btn-add-rental"
                onClick={handleAddAndStay}
              >
                🛒 Thêm vào danh sách thuê
              </button>
              <button
                type="button"
                className="btn-checkout-now"
                onClick={handleAddAndGoToCart}
              >
                ⚡ Thuê ngay & Xem giỏ
              </button>
            </div>
          </div>

          <div className="back-link-wrapper">
            <Link to="/bikes" className="back-link">
              ← Quay lại danh sách xe máy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorbikeDetailPage;
