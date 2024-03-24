import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';

// 로고 이미지
import check from '../../src/assets/images/check.png';

const SignUpSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container>
        <CenteredContent>
          <Check src={check} alt="check" />
          <Title>회원가입이 성공적으로 이루어졌습니다.</Title>
          <Subtitle>로그인 후 모든 서비스를 이용할 수 있습니다.</Subtitle>
        </CenteredContent>
        <WhiteButton onClick={() => navigate('/login')}>
          로그인하러 가기
        </WhiteButton>
      </Container>
      <Footer />
    </>
  );
};

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Check = styled.img`
  height: 60px;
  margin-bottom: 20px;
`;

const WhiteButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #C8256A;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #912552;
  }
`;

export default SignUpSuccess;
