import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../api/Auth';

import logoImage from '../../assets/images/logo.png';

// 토큰 확인 및 로그인 상태 반환 함수
const checkLoginStatus = () => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  return !!token;
};

const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 로그인 상태 확인
    const status = checkLoginStatus();
    setLoggedIn(status);
  }, []);

  const handleLogout = () => {
    // Display a confirmation dialog
    const confirmLogout = window.confirm('정말 로그아웃 하시겠습니까?');
  
    // If the user confirms, proceed with logout
    if (confirmLogout) {
      logout();
      setLoggedIn(false);
    }
  };  

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logoImage} alt="COOKTAIL Logo" />
      </Link>
      <Navigation>
        <ul>
          <NavItem><Link to="/cocktails">칵테일 레시피</Link></NavItem>
          <NavItem><Link to="/cooks">안주 레시피</Link></NavItem>
          <NavItem><Link to="/mypage">마이 페이지</Link></NavItem>
        </ul>
      </Navigation>
      <UserActions>
        {isLoggedIn ? (
          // 로그인 상태일 때는 로그아웃 버튼 표시
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          // 비로그인 상태일 때는 로그인 버튼 표시
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button>로그인</button>
          </Link>
        )}
      </UserActions>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 10px 50px;
  background-color: #fff;
`;

const Logo = styled.img`
  height: 55px;
  margin-right: 10px;
`;

const Navigation = styled.nav`
  margin-left: auto;

  ul {
    list-style: none;
    display: flex;
    margin-left: auto;
  }
`;

const NavItem = styled.li`
  margin-left: 20px;

  a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
    font-size: 15px;
  }
`;

const UserActions = styled.div`
  button {
    background-color: #C8256A;
    color: white;
    border: none;
    padding: 5px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    cursor: pointer;
    border-radius: 10px;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
`;

export default Header;
