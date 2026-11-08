import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import motorbikes from '../data/motorbikes';
import MotorbikeCard from '../components/MotorbikeCard';

const Home = () => {
  const navigate = useNavigate();
  const [quickSearch, setQuickSearch] = React.useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/bikes?keyword=${encodeURIComponent(quickSearch.trim())}`);
    } else {
      navigate('/bikes');
    }
  };

  // Top 4 featured bikes
  const featuredBikes = motorbikes.slice(0, 4);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">🌟 Dịch vụ cho thuê xe máy số 1</span>
          <h1 className="hero-title">
            Thuê Xe Máy Dễ Dàng <br />
            <span className="text-gradient">Tự Do Khám Phá Mọi Nẻo Đường</span>
          </h1>
          <p className="hero-subtitle">
            Hơn 50+ dòng xe đời mới từ xe số tiết kiệm đến xe tay ga cao cấp. Thủ tục đơn giản chỉ cần CCCD, nhận xe trong 15 phút kèm đầy đủ phụ kiện.
          </p>

          {/* Quick Search Form */}
          <form className="hero-search-box" onSubmit={handleSearchSubmit}>
            <div className="search-input-group">
              <span className="input-icon">🔍</span>
              <input
                type="text"
                placeholder="Bạn muốn thuê xe gì? (Vision, Air Blade, Wave, Exciter...)"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="hero-search-btn">
              Tìm xe ngay
            </button>
          </form>

          {/* Quick Links */}
          <div className="hero-quick-tags">
            <span>Gợi ý:</span>
            <Link to="/bikes?category=Xe%20tay%20ga">Xe tay ga</Link>
            <Link to="/bikes?category=Xe%20số">Xe số</Link>
            <Link to="/bikes?category=Xe%20côn%20tay">Xe côn tay</Link>
            <Link to="/bikes">Tất cả xe</Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header text-center">
          <h2 className="section-title">Tại Sao Nên Chọn MotoRental?</h2>
          <p className="section-subtitle">Dịch vụ chuyên nghiệp đem đến trải nghiệm di chuyển hoàn hảo nhất</p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🛵</div>
            <h3 className="benefit-title">100% Xe Đời Mới</h3>
            <p className="benefit-desc">
              Tất cả xe đều từ đời 2022 trở lên, được rửa sạch và kiểm tra kỹ thuật, thay nhớt định kỳ trước khi bàn giao.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">📍</div>
            <h3 className="benefit-title">Giao Xe Tận Nơi</h3>
            <p className="benefit-desc">
              Giao xe miễn phí tận nơi tại Sân bay, Ga tàu, Bến xe và Khách sạn nội thành chỉ trong vòng 15 - 30 phút.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3 className="benefit-title">Đầy Đủ Trang Bị</h3>
            <p className="benefit-desc">
              Trang bị sẵn 2 nón bảo hiểm đạt chuẩn, 2 áo mưa tiện lợi, giá đỡ điện thoại xem bản đồ và bảo hiểm xe máy.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">💵</div>
            <h3 className="benefit-title">Giá Thuê Minh Bạch</h3>
            <p className="benefit-desc">
              Giá thuê rõ ràng chỉ từ 95.000₫/ngày. Không phụ phí ẩn, thủ tục nhanh gọn không giữ giấy tờ gốc nếu cọc tiền.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Bikes Section */}
      <section className="featured-bikes-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title mb-1">Xe Máy Nổi Bật Được Yêu Thích</h2>
            <p className="section-subtitle mb-0">Các dòng xe phổ biến với mức giá thuê ưu đãi nhất</p>
          </div>
          <Link to="/bikes" className="view-all-link">
            Xem tất cả {motorbikes.length} xe →
          </Link>
        </div>

        <div className="bikes-grid">
          {featuredBikes.map((bike) => (
            <MotorbikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      {/* 3 Steps Rental Process */}
      <section className="rental-steps-section">
        <div className="section-header text-center">
          <h2 className="section-title">Quy Trình Thuê Xe 3 Bước Đơn Giản</h2>
          <p className="section-subtitle">Chỉ mất 2 phút để hoàn tất chọn xe và lên đường</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Chọn xe phù hợp</h3>
            <p className="step-desc">
              Xem thông tin, hình ảnh, giá thuê và chọn dòng xe yêu thích trên website.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Điền thông tin đặt thuê</h3>
            <p className="step-desc">
              Nhập số ngày thuê, thời gian và địa điểm nhận xe thuận tiện cho bạn.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Nhận xe & Khám phá</h3>
            <p className="step-desc">
              Nhận xe tận nơi, kiểm tra xe, nhận nón bảo hiểm và tự do bắt đầu hành trình!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
