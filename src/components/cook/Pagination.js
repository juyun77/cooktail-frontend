import React from 'react';
import styled from 'styled-components';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PageNumber
            key={i}
            onClick={() => onPageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PageNumber>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - 3);
      let endPage = Math.min(totalPages, startPage + 6);

      if (currentPage <= 4) {
        startPage = 1;
        endPage = 7;
      } else if (currentPage >= totalPages - 3) {
        startPage = totalPages - 6;
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PageNumber
            key={i}
            onClick={() => onPageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PageNumber>
        );
      }

      if (endPage < totalPages) {
        pageNumbers.push(
          <span key="ellipsis">...</span>
        );

        pageNumbers.push(
          <PageNumber
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            isActive={totalPages === currentPage}
          >
            {totalPages}
          </PageNumber>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      {currentPage > 1 && (
        <PageArrow onClick={() => onPageChange(currentPage - 1)}>&lt;</PageArrow>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <PageArrow onClick={() => onPageChange(currentPage + 1)}>&gt;</PageArrow>
      )}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const PageNumber = styled.div`
  cursor: pointer;
  margin: 0 5px;
  padding: 8px;
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? '#C8256A' : '#ccc')};
  transition: color 0.3s ease;
  
  &:hover {
    color: #C8256A;
  }
`;

const PageArrow = styled.div`
  cursor: pointer;
  margin: 0 5px;
  padding: 8px;
  background-color: transparent;
  color: #ccc;
  transition: color 0.3s ease;

  &:hover {
    color: #C8256A; 
  }
`;

export default Pagination;
