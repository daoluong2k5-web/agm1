import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-brand">
              <span>🏍️</span> MotoRental
            </h3>
            <p className="footer-desc">
              Dịch vụ cho thuê xe máy uy tín hàng đầu. Cam kết xe đời mới, bảo dưỡng định kỳ, giao nhận xe tận nơi nhanh chóng với mức giá tốt nhất.
            </p>
            <div className="footer-badges">
              <span className="badge-item">✓ Nón bảo hiểm miễn phí</span>
              <span className="badge-item">✓ 2 áo mưa tiện lợi</span>
              <span className="badge-item">✓ Cứu hộ 24/7</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Liên kết nhanh</h4>
            <ul className="footer-links">
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/bikes">Danh sách xe máy</Link></li>
              <li><Link to="/rental-list">Danh sách xe đã chọn</Link></li>
              <li><Link to="/bikes?category=Xe%20tay%20ga">Xe tay ga</Link></li>
              <li><Link to="/bikes?category=Xe%20số">Xe số tiết kiệm</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Thủ tục thuê xe</h4>
            <ul className="footer-policies">
              <li>📄 CCCD / Hộ chiếu hoặc Bằng lái xe</li>
              <li>💵 Tiền cọc từ 500k hoặc giấy tờ tùy thân</li>
              <li>🛵 Giao xe tại Sân bay, Ga tàu, Khách sạn</li>
              <li>⏱️ Thuê theo ngày (24h tính từ giờ nhận)</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Liên hệ hỗ trợ</h4>
            <p className="footer-contact-item">📍 123 Đường Cầu Giấy, Hà Nội</p>
            <p className="footer-contact-item">📞 Hotline: 0988.123.456</p>
            <p className="footer-contact-item">✉️ Email: contact@motorental.vn</p>
            <p className="footer-contact-item">⏰ Giờ mở cửa: 06:30 - 22:30 hàng ngày</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MotoRental – FER202 Assignment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
