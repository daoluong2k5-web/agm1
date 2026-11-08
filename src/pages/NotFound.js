import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-icon">🛵💨</div>
        <h1 className="not-found-code">404 - Không tìm thấy trang</h1>
        <p className="not-found-desc">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ khác.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-home">
            Về trang chủ
          </Link>
          <Link to="/bikes" className="btn-view-bikes">
            Xem danh sách xe máy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
