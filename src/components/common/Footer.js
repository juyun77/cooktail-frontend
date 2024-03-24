import React from 'react';
import styled from 'styled-components';

// 로고 이미지
import logoImage from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <FooterContainer>
      <Logo src={logoImage} alt="COOKTAIL Logo" />
      <LinksContainer>
        <PrivacyLink href="/privacy">개인정보 처리방침</PrivacyLink>
        <TermsLink href="/terms">이용약관</TermsLink>
        <TeamLink href="/team">제작 김희윤, 김주윤</TeamLink>
      </LinksContainer>
      <Copyright>&copy; COOKTAIL. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  padding: 10px;
  text-align: center;
  width: 100%;
  margin-top: auto; /* Push the footer to the bottom */
`;


const Logo = styled.img`
  height: 40px; // 로고 높이 설정
  margin-bottom: 10px;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const PrivacyLink = styled.a`
  color: #555;
  font-size: 12px;
  text-decoration: none;
  margin-right: 20px;
`;

const TermsLink = styled.a`
  color: #555;
  font-size: 12px;
  text-decoration: none;
  margin-right: 20px;
`;

const TeamLink = styled.a`
  color: #555;
  font-size: 12px;
  text-decoration: none;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: bold;
  color: #444;
`;

export default Footer;
