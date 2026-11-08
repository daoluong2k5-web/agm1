import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) {
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    if (pageNumber === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', pageNumber.toString());
    }
    setSearchParams(newParams);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        type="button"
        className="pagination-btn nav-btn"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Trước
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`pagination-btn page-num ${p === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        className="pagination-btn nav-btn"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination;
