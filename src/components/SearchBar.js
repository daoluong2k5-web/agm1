import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchBar = ({ placeholder = "Tìm kiếm tên xe (Vision, Air Blade, Wave...)" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentKeyword = searchParams.get('keyword') || '';
  const [searchTerm, setSearchTerm] = useState(currentKeyword);

  useEffect(() => {
    setSearchTerm(currentKeyword);
  }, [currentKeyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    const trimmed = searchTerm.trim();

    if (trimmed) {
      newParams.set('keyword', trimmed);
    } else {
      newParams.delete('keyword');
    }

    setSearchParams(newParams);
  };

  const handleClear = () => {
    setSearchTerm('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('keyword');
    setSearchParams(newParams);
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={handleClear}
          title="Xóa tìm kiếm"
        >
          ✕
        </button>
      )}
      <button type="submit" className="search-btn">
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchBar;
