import React from 'react';
// import './Pagination.css'; // Import CSS file for styling (chỉ để minh họa)

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageNumbers = 5; // Số lượng nút trang tối đa hiển thị

  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination-container">
      <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
        Đầu trang
      </button>
      {[...Array(endPage - startPage + 1)].map((_, index) => {
        const pageNumber = startPage + index;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        );
      })}
      <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
        Cuối trang
      </button>
    </div>
  );
};

export default Pagination;
