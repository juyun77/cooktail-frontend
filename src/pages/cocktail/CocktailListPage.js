import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import CocktailList from '../../components/cocktail/CocktailList';
import Pagination from '../../components/cocktail/Pagination';
import { getAllCocktails } from '../../api/Cocktail';

const ITEMS_PER_PAGE = 8;

const CocktailListPage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCocktails({
          sortBy: sortOption,
          page: currentPage - 1,
          perPage: ITEMS_PER_PAGE,
          keyword: searchKeyword,
        });
        setCocktails(response.content || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error('Error fetching cocktails:', error.message);
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
      <BoardTitle>칵테일 레시피</BoardTitle>
      <CocktailList
        cocktails={cocktails}
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

export default CocktailListPage;
