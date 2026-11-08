import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRental } from '../context/RentalContext';

const RentalListPage = () => {
  const navigate = useNavigate();
  const {
    rentalList,
    removeFromRental,
    updateDays,
    clearRental,
    totalBikes,
    totalDays,
    totalAmount
  } = useRental();

  const formattedTotalAmount = new Intl.NumberFormat('vi-VN').format(totalAmount) + '₫';

  return (
    <div className="rental-list-page-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <Link to="/">Trang chủ</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Danh sách xe đã chọn</span>
      </nav>

      <div className="page-header">
        <div>
          <h1 className="page-title">Danh Sách Xe Thuê Của Bạn</h1>
          <p className="page-subtitle">
            Kiểm tra thông tin các dòng xe bạn muốn thuê, điều chỉnh số ngày và xem tổng chi phí
          </p>
        </div>
      </div>

      {rentalList.length === 0 ? (
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-cart-title">Danh sách thuê của bạn đang trống</h2>
          <p className="empty-cart-text">
            Bạn chưa chọn chiếc xe máy nào. Hãy duyệt qua danh sách xe của chúng tôi để chọn chiếc xe ưng ý nhất!
          </p>
          <Link to="/bikes" className="btn-explore-bikes">
            🛵 Xem danh sách xe máy ngay
          </Link>
        </div>
      ) : (
        <div className="rental-content-layout">
          {/* Left Table / List */}
          <div className="rental-items-column">
            <div className="items-header-bar">
              <span className="items-count-text">
                Đang chọn: <strong>{totalBikes}</strong> xe máy ({totalDays} ngày thuê)
              </span>
              <button
                type="button"
                className="btn-clear-all"
                onClick={clearRental}
                title="Xóa toàn bộ danh sách thuê"
              >
                🗑️ Xóa tất cả
              </button>
            </div>

            <div className="rental-table-wrapper">
              <table className="rental-table">
                <thead>
                  <tr>
                    <th>Thông tin xe máy</th>
                    <th style={{ width: '150px' }}>Giá thuê / ngày</th>
                    <th style={{ width: '150px' }}>Số ngày thuê</th>
                    <th style={{ width: '150px' }}>Thành tiền</th>
                    <th style={{ width: '80px' }}>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {rentalList.map((item) => {
                    const pricePerDay = item.pricePerDay || item.price || 0;
                    const itemSubtotal = pricePerDay * item.days;
                    const formattedItemPrice = new Intl.NumberFormat('vi-VN').format(pricePerDay) + '₫';
                    const formattedSubtotal = new Intl.NumberFormat('vi-VN').format(itemSubtotal) + '₫';

                    return (
                      <tr key={item.id} className="rental-item-row">
                        <td className="item-info-cell">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="item-thumbnail"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=150&q=80';
                            }}
                          />
                          <div className="item-details">
                            <Link to={`/bikes/${item.id}`} className="item-name-link">
                              {item.name}
                            </Link>
                            <div className="item-badges">
                              <span className="item-category-pill">{item.category}</span>
                              <span className="item-engine-pill">{item.engine}</span>
                            </div>
                            <div className="item-deposit-note">
                              Cọc: {item.deposit || 'CCCD'}
                            </div>
                          </div>
                        </td>

                        <td className="item-price-cell">
                          <strong>{formattedItemPrice}</strong>
                        </td>

                        <td className="item-days-cell">
                          <div className="days-control">
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateDays(item.id, item.days - 1)}
                              disabled={item.days <= 1}
                              title="Giảm 1 ngày"
                            >
                              -
                            </button>
                            <span className="qty-value">{item.days}</span>
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateDays(item.id, item.days + 1)}
                              title="Tăng 1 ngày"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="item-subtotal-cell">
                          <span className="subtotal-amount">{formattedSubtotal}</span>
                        </td>

                        <td className="item-action-cell">
                          <button
                            type="button"
                            className="btn-delete-item"
                            onClick={() => removeFromRental(item.id)}
                            title="Xóa xe này khỏi danh sách thuê"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="table-bottom-actions">
              <Link to="/bikes" className="btn-continue-shopping">
                ← Chọn thêm xe khác
              </Link>
            </div>
          </div>

          {/* Right Summary Box */}
          <div className="rental-summary-column">
            <div className="summary-card">
              <h3 className="summary-title">Tóm Tắt Đơn Thuê</h3>

              <div className="summary-row">
                <span className="summary-label">Số lượng xe:</span>
                <span className="summary-value"><strong>{totalBikes}</strong> xe</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Tổng số ngày thuê:</span>
                <span className="summary-value"><strong>{totalDays}</strong> ngày</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Trang bị đi kèm:</span>
                <span className="summary-value text-success">Miễn phí 2 nón + 2 áo mưa/xe</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Phí giao nhận:</span>
                <span className="summary-value text-success">Miễn phí nội thành</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total-row">
                <span className="total-label">Tổng tiền thuê:</span>
                <span className="total-amount-highlight">{formattedTotalAmount}</span>
              </div>

              <p className="summary-note">
                * Tiền cọc (hoặc CCCD) sẽ được hoàn trả 100% ngay khi quý khách trả lại xe.
              </p>

              <button
                type="button"
                className="btn-proceed-checkout"
                onClick={() => navigate('/checkout')}
              >
                Tiến hành đặt thuê xe →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalListPage;
