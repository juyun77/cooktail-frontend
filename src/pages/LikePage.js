import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MyCocktailList from '../components/mypage/MyCocktailList';
import MyCookList from '../components/mypage/MyCookList';
import Sidebar from '../components/mypage/Sidebar';
import { getLikedCocktails, getLikedCooks } from '../api/MyPage';

const LikePage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [cooks, setCooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken(); // 사용자 토큰을 가져오는 함수 호출
        const myCocktails = await getLikedCocktails(token);
        setCocktails(myCocktails);
        const myCooks = await getLikedCooks(token);
        setCooks(myCooks);
      } catch (error) {
        console.error('본인이 작성한 레시피 조회 오류:', error);
      }
    };

    fetchData();
  }, []);

  // 쿠키에서 토큰을 가져오는 함수
  const getToken = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  };

  return (
    <>
      <Header />
      <BoardTitle>내가 좋아요 한 레시피</BoardTitle>
      <Layout>
        <Sidebar />
        <Container>
          <Title>칵테일 레시피</Title>
          <MyCocktailList cocktails={cocktails} />
          <Title>안주 레시피</Title>
          <MyCookList cooks={cooks} />
        </Container>
      </Layout>
      <Footer />
    </>
  );
};

const BoardTitle = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-left: 15px;
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  width: calc(100% - 200px);
  max-width: 940px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  align-items: flex-start;
  flex-grow: 1;
  margin-right: 100px;
`;

export default LikePage;
