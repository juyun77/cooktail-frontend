import React, { useState } from 'react';
import styled from 'styled-components';
import CookItem from '../cook/CookItem';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../api/Auth';

const MyCookList = ({ cooks }) => {
  const navigate = useNavigate();

  return (
    <ListContainer>
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
  position: relative;
  overflow-x: auto; /* 가로 스크롤 추가 */
  max-width: 100vw;
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

export default MyCookList;
