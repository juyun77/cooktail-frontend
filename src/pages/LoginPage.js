import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { login } from '../api/Auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // 추가: 에러 상태

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 입력값이 비어있는지 확인
      if (!username || !password) {
        setError('아이디와 비밀번호를 모두 입력해주세요.');
        return;
      }

      const { token, memberId } = await login(username, password);
      navigate('/cocktails');
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('아이디 또는 비밀번호가 올바르지 않습니다.'); // 에러 메시지 설정
    }
  };

  return (
    <>
      <Header />
      <Title>로그인</Title>
      <Container>
        <FormContainer>
          <InputLabel>이메일</InputLabel>
          <Input
            type="text"
            placeholder="아이디를 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputLabel>비밀번호</InputLabel>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordRecoveryLink to="/recovery">아이디/비밀번호 찾기</PasswordRecoveryLink>
          {error && <ErrorMessage>{error}</ErrorMessage>} {/* 추가: 에러 메시지 렌더링 */}
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <Signup>아직 회원이 아니신가요? <SignupLink to="/signup">회원가입</SignupLink></Signup>
        </FormContainer>
      </Container>
      <Footer />
    </>
  );
};

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 940px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
`;

const InputLabel = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
`;

const PasswordRecoveryLink = styled(Link)`
  display: block;
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #C8256A;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Signup = styled(Link)`
  display: block;
  text-align: center;
  color: #333;
  margin-top: 10px;
  text-decoration: none;
  cursor: auto;
`;

const SignupLink = styled(Link)`
  color: #333;
  text-decoration: underline;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

export default LoginPage;
