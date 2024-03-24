import React, { useState } from 'react';
import styled from 'styled-components';

const SortingOptions = ({ onSortClick }) => {
  const [selectedOption, setSelectedOption] = useState('createdAt,desc');

  const handleSortClick = (sortOption) => {
    setSelectedOption(sortOption);
    onSortClick(sortOption);
  };

  return (
    <Options>
      <p onClick={() => handleSortClick('createdAt,desc')} className={selectedOption === 'createdAt,desc' ? 'selected' : ''}>· 최신순</p>
      <p onClick={() => handleSortClick('views,desc')} className={selectedOption === 'views,desc' ? 'selected' : ''}>· 조회순</p>
      <p onClick={() => handleSortClick('likes,desc')} className={selectedOption === 'likes,desc' ? 'selected' : ''}>· 좋아요순</p>
      <p onClick={() => handleSortClick('abv,desc')} className={selectedOption === 'abv,desc' ? 'selected' : ''}>· 도수낮은순</p>
      <p onClick={() => handleSortClick('abv,asc')} className={selectedOption === 'abv,asc' ? 'selected' : ''}>· 도수높은순</p>
    </Options>
  );
};

const Options = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 50px;
  p {
    margin-left: 5px;
    font-size: 12px;
    color: #aeaeae;
    cursor: pointer;
  }

  .selected {
    color: #C8256A; 
    font-weight: bold;
  }
`;

export default SortingOptions;
