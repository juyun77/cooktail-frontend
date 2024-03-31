import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import CookList from '../../components/cook/CookList';
import Pagination from '../../components/cook/Pagination';
import { getAllCooks } from '../../api/Cook';

const ITEMS_PER_PAGE = 8;

const CookListPage = () => {
  const [cooks, setCooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCooks({
          sortBy: sortOption,
          page: currentPage - 1,
          perPage: ITEMS_PER_PAGE,
          keyword: searchKeyword,
        });
        setCooks(response.content || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error('Error fetching cooks:', error.message);
      }
    };

    fetchData();
  }, [sortOption, currentPage, searchKeyword]);

  const handleSortClick = (newSortOption) => {
    setSortOption(newSortOption);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <BoardTitle>안주 레시피</BoardTitle>
      <CookList
        cooks={cooks}
        onSortClick={handleSortClick}
        onSearch={handleSearch}
      />
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </PaginationContainer>
      <Footer />
    </>
  );
};

const BoardTitle = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
`;

export default CookListPage;
