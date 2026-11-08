import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, brands } from '../data/motorbikes';

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'Tất cả';
  const selectedBrand = searchParams.get('brand') || 'Tất cả';
  const selectedSort = searchParams.get('sort') || 'default';

  const handleCategoryChange = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat && cat !== 'Tất cả') {
      newParams.set('category', cat);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleBrandChange = (e) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val && val !== 'Tất cả') {
      newParams.set('brand', val);
    } else {
      newParams.delete('brand');
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val && val !== 'default') {
      newParams.set('sort', val);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="filter-controls-container">
      {/* Category Pills */}
      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Brand & Sort Dropdowns */}
      <div className="filter-dropdowns">
        <div className="select-wrapper">
          <label className="select-label">Hãng xe:</label>
          <select
            className="filter-select"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b === 'Tất cả' ? 'Tất cả hãng xe' : b}
              </option>
            ))}
          </select>
        </div>

        <div className="select-wrapper">
          <label className="select-label">Sắp xếp:</label>
          <select
            className="filter-select"
            value={selectedSort}
            onChange={handleSortChange}
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="name-asc">Tên xe: A - Z</option>
            <option value="name-desc">Tên xe: Z - A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
