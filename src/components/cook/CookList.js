import React, { useState } from 'react';
import styled from 'styled-components';
import CookItem from './CookItem';
import SortingOptions from './SortingOptions';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../api/Auth';

const CookList = ({ cooks, onSortClick, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleWriteClick = () => {
    const token = getToken();
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    navigate('/cooks/create');
  };
  

  return (
    <ListContainer>
      <SearchContainer>
        <SearchBar
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
        <WriteButton onClick={handleWriteClick}>글쓰기</WriteButton>
      </SearchContainer>
      <SortingOptions onSortClick={onSortClick} />
      <List>
        {cooks.map((cooks) => (
          <CookItem key={cooks.id} cooks={cooks} />
        ))}
      </List>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 100%;
  max-width: 1258px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  position: relative;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 65%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #F9ECF2;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  margin-left: 20px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  background-color: #C8256A;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;

const WriteButton = styled.button`
  margin-left: 15px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  background-color: #C8256A;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;
const List = styled.ul`
  margin-top: 5px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1258px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    width: 80%; 
    margin: 0 auto;
  }
`;

export default CookList;
