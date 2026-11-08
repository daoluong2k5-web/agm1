import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import motorbikes from '../data/motorbikes';
import MotorbikeCard from '../components/MotorbikeCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const MotorbikeListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = (searchParams.get('keyword') || '').trim();
  const category = (searchParams.get('category') || '').trim();
  const brand = (searchParams.get('brand') || '').trim();
  const sort = searchParams.get('sort') || 'default';

  // Filter & sort logic
  const filteredBikes = useMemo(() => {
    let result = [...motorbikes];

    // Filter by keyword (case-insensitive)
    if (keyword) {
      const lower = keyword.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(lower) ||
          b.brand.toLowerCase().includes(lower) ||
          b.category.toLowerCase().includes(lower)
      );
    }

    // Filter by category
    if (category && category !== 'Tất cả' && category !== 'All Categories') {
      result = result.filter(
        (b) => b.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by brand
    if (brand && brand !== 'Tất cả') {
      result = result.filter(
        (b) => b.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // Sort by price or name
    if (sort === 'price-asc') {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sort === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [keyword, category, brand, sort]);

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(keyword || (category && category !== 'Tất cả') || (brand && brand !== 'Tất cả') || (sort && sort !== 'default'));

  return (
    <div className="bikes-page-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <Link to="/">Trang chủ</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Danh sách xe máy</span>
      </nav>

      {/* Page Title & Search Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Danh Sách Xe Máy Cho Thuê</h1>
          <p className="page-subtitle">
            Lựa chọn dòng xe phù hợp với nhu cầu và phong cách của bạn
          </p>
        </div>
      </div>

      {/* Search & Filter Component */}
      <div className="search-filter-section">
        <div className="search-row">
          <SearchBar />
        </div>
        <CategoryFilter />
      </div>

      {/* Results Meta Info */}
      <div className="results-meta-bar">
        <div className="results-count">
          Hiển thị <strong>{filteredBikes.length}</strong> trên tổng số <strong>{motorbikes.length}</strong> xe
          {keyword && <span> cho từ khóa &quot;<em>{keyword}</em>&quot;</span>}
          {category && category !== 'Tất cả' && <span> thuộc danh mục <strong>{category}</strong></span>}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn-clear-filters"
            onClick={handleResetFilters}
          >
            ✕ Đặt lại bộ lọc
          </button>
        )}
      </div>

      {/* Motorbikes Grid */}
      {filteredBikes.length === 0 ? (
        <div className="empty-results-box">
          <div className="empty-icon">🛵💨</div>
          <h3 className="empty-title">Không tìm thấy xe máy phù hợp</h3>
          <p className="empty-desc">
            Không có xe nào khớp với điều kiện tìm kiếm hoặc bộ lọc hiện tại của bạn.
          </p>
          <button
            type="button"
            className="btn-primary-action"
            onClick={handleResetFilters}
          >
            Xem tất cả xe
          </button>
        </div>
      ) : (
        <div className="bikes-grid">
          {filteredBikes.map((bike) => (
            <MotorbikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MotorbikeListPage;
