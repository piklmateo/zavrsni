import React, { useState, useEffect } from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }: PaginationProps) => {
  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / pageSize));

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  const handlePreviousPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  return (
    <div className="pagination-container">
      {currentPage > 1 && (
        <button className="btn btn_pagination" onClick={handlePreviousPage}>
          Previous
        </button>
      )}
      <div className="pagination-number-container">
        <span>Page</span>
        <span>{currentPage}</span> / <span>{totalPages}</span>
      </div>
      {currentPage < totalPages && (
        <button className="btn btn_pagination" onClick={handleNextPage}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
