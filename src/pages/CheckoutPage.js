import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRental } from '../context/RentalContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { rentalList, totalAmount, totalBikes, clearRental } = useRental();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    idCard: '',
    startDate: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    deliveryLocation: 'Sân bay',
    addressDetail: '',
    paymentMethod: 'cash_on_delivery',
    notes: ''
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rentalList.length === 0) return;

    // Generate random booking reference
    const code = 'MOTO-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setIsSuccessModalOpen(true);
  };

  const handleFinishBooking = () => {
    clearRental();
    setIsSuccessModalOpen(false);
    navigate('/');
  };

  if (rentalList.length === 0 && !isSuccessModalOpen) {
    return (
      <div className="empty-cart-card my-5">
        <div className="empty-cart-icon">🛵</div>
        <h2>Bạn chưa có xe nào trong danh sách thuê</h2>
        <p>Vui lòng chọn ít nhất một chiếc xe trước khi đặt thuê.</p>
        <Link to="/bikes" className="btn-explore-bikes">
          ← Xem danh sách xe máy
        </Link>
      </div>
    );
  }

  const formattedTotalAmount = new Intl.NumberFormat('vi-VN').format(totalAmount) + '₫';

  return (
    <div className="checkout-page-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <Link to="/">Trang chủ</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/rental-list">Danh sách xe thuê</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Thông tin đặt thuê xe</span>
      </nav>

      <div className="page-header">
        <div>
          <h1 className="page-title">Xác Nhận & Đặt Thuê Xe Máy</h1>
          <p className="page-subtitle">
            Vui lòng điền thông tin để chúng tôi chuẩn bị xe và giao tận nơi đúng giờ hẹn
          </p>
        </div>
      </div>

      <div className="checkout-layout">
        {/* Left: Booking Form */}
        <div className="checkout-form-column">
          <form className="booking-form-card" onSubmit={handleSubmit}>
            <h3 className="form-section-title">1. Thông tin người thuê xe</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Họ và tên người thuê <span className="text-danger">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Số điện thoại liên hệ <span className="text-danger">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  pattern="[0-9]{9,11}"
                  placeholder="Ví dụ: 0912345678"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="idCard">
                  Số CCCD / Hộ chiếu <span className="text-danger">*</span>
                </label>
                <input
                  id="idCard"
                  name="idCard"
                  type="text"
                  required
                  placeholder="Nhập số CCCD (12 số) hoặc Hộ chiếu"
                  className="form-input"
                  value={formData.idCard}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h3 className="form-section-title mt-4">2. Thời gian & Địa điểm nhận xe</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="startDate">
                  Ngày nhận xe <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  className="form-input"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="startTime">
                  Giờ nhận xe dự kiến
                </label>
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  className="form-input"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="deliveryLocation">
                  Địa điểm nhận xe
                </label>
                <select
                  id="deliveryLocation"
                  name="deliveryLocation"
                  className="form-input"
                  value={formData.deliveryLocation}
                  onChange={handleChange}
                >
                  <option value="Sân bay">Sân bay (Giao miễn phí)</option>
                  <option value="Ga tàu">Ga tàu hỏa</option>
                  <option value="Khách sạn">Khách sạn / Homestay</option>
                  <option value="Cửa hàng">Đến nhận tại cửa hàng</option>
                  <option value="Địa chỉ khác">Địa chỉ khác</option>
                </select>
              </div>

              <div className="form-group form-col-full">
                <label className="form-label" htmlFor="addressDetail">
                  Địa chỉ chi tiết nhận xe (Tên khách sạn, số phòng, số nhà...)
                </label>
                <input
                  id="addressDetail"
                  name="addressDetail"
                  type="text"
                  placeholder="Ví dụ: Khách sạn Mường Thanh, 78 Trần Phú..."
                  className="form-input"
                  value={formData.addressDetail}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group form-col-full">
                <label className="form-label" htmlFor="notes">
                  Ghi chú yêu cầu thêm (kích cỡ nón bảo hiểm, thời gian cần gấp...)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  placeholder="Ghi chú thêm nếu có..."
                  className="form-input"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <h3 className="form-section-title mt-4">3. Phương thức thanh toán</h3>
            <div className="payment-options">
              <label className="payment-option-card">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash_on_delivery"
                  checked={formData.paymentMethod === 'cash_on_delivery'}
                  onChange={handleChange}
                />
                <div className="payment-text">
                  <strong>Thanh toán khi nhận xe (Tiền mặt hoặc Chuyển khoản)</strong>
                  <p>Quý khách kiểm tra xe ưng ý trước khi thanh toán tiền thuê cho nhân viên giao xe.</p>
                </div>
              </label>

              <label className="payment-option-card">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={formData.paymentMethod === 'bank_transfer'}
                  onChange={handleChange}
                />
                <div className="payment-text">
                  <strong>Chuyển khoản QR ngân hàng giữ xe trước</strong>
                  <p>Nhân viên tổng đài sẽ gọi xác nhận và gửi mã QR ngân hàng tiện lợi.</p>
                </div>
              </label>
            </div>

            <div className="form-submit-row">
              <button type="submit" className="btn-confirm-booking">
                ✓ Hoàn Tất Đặt Thuê Xe
              </button>
            </div>
          </form>
        </div>

        {/* Right: Order Preview */}
        <div className="checkout-summary-column">
          <div className="summary-card">
            <h3 className="summary-title">Đơn Thuê Xe ({totalBikes} xe)</h3>

            <div className="checkout-items-list">
              {rentalList.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <div className="checkout-item-meta">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-sub">
                      {item.days} ngày x {new Intl.NumberFormat('vi-VN').format(item.pricePerDay || item.price)}₫
                    </span>
                  </div>
                  <span className="checkout-item-total">
                    {new Intl.NumberFormat('vi-VN').format((item.pricePerDay || item.price) * item.days)}₫
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total-row">
              <span className="total-label">Tổng cộng:</span>
              <span className="total-amount-highlight">{formattedTotalAmount}</span>
            </div>

            <div className="security-badges-box mt-3">
              <div>🔒 Cam kết không phát sinh chi phí</div>
              <div>⚡ Xác nhận qua tin nhắn/điện thoại trong 5 phút</div>
              <div>🛵 Đổi xe miễn phí nếu không ưng ý</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog-card">
            <div className="modal-success-icon">🎉</div>
            <h2 className="modal-title">Đặt Thuê Xe Thành Công!</h2>
            <p className="modal-desc">
              Cảm ơn quý khách <strong>{formData.fullName}</strong>. Đơn thuê xe máy của bạn đã được tiếp nhận.
            </p>

            <div className="modal-order-details">
              <div className="modal-detail-row">
                <span>Mã đơn đặt xe:</span>
                <strong className="text-primary">{bookingCode}</strong>
              </div>
              <div className="modal-detail-row">
                <span>Số điện thoại:</span>
                <strong>{formData.phone}</strong>
              </div>
              <div className="modal-detail-row">
                <span>Ngày nhận xe:</span>
                <strong>{formData.startDate} ({formData.startTime})</strong>
              </div>
              <div className="modal-detail-row">
                <span>Địa điểm nhận:</span>
                <strong>{formData.deliveryLocation} - {formData.addressDetail || 'Nội thành'}</strong>
              </div>
              <div className="modal-detail-row modal-total-highlight">
                <span>Tổng tiền thuê:</span>
                <strong className="text-danger">{formattedTotalAmount}</strong>
              </div>
            </div>

            <p className="modal-footer-notice">
              Nhân viên tổng đài MotoRental sẽ liên hệ số <strong>{formData.phone}</strong> trong vòng 5 phút để xác nhận vị trí giao xe.
            </p>

            <button
              type="button"
              className="btn-modal-close"
              onClick={handleFinishBooking}
            >
              Về Trang Chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
