import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CookItem = ({ cooks }) => {
  const { id, title, recipe, difficulty, member, views, likes, images } = cooks;
  let { createdAt, updatedAt } = cooks;
  createdAt = createdAt.split('T')[0];
  updatedAt = updatedAt ? updatedAt.split('T')[0] : null;
  return (
    <StyledLink to={`/cooks/${id}`} style={{ textDecoration: 'none' }}>
    <ItemContainer>
      {images.length > 0 && (
      <Image src={images[0]} alt={`Cook Image`} />
    )}
      <TextContainer>
        <Title>{title}
        <Difficulty>난이도 {difficulty}</Difficulty></Title>
        <Description>{recipe}</Description>
        <Info>
          <User><span>{member.nickname}</span></User>
          <span>· {createdAt}</span>
          <span>· 조회 {views}</span>
          <span> · 좋아요 {likes}</span>
        </Info>
      </TextContainer>
    </ItemContainer>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;


const ItemContainer = styled.div`
  width: 268px;
  height: 262px;
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 268px;
  height: 172px;
  object-fit: cover;
  border-radius: 10px;
`;

const TextContainer = styled.div`
  padding: 5px;
`;

const Title = styled.p`
  font-size: 20px;
  margin-bottom: 0px;
  margin-top: 7px;
`;

const Description = styled.p`
  font-size: 13px;
  margin-bottom: 10px;
  color: #525252;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #525252;
`;

const User = styled.div`
  color: #C8256A;
`;

const Difficulty = styled.button`
  margin-left: 20px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #C8256A;
  color: #fff;
  border-radius: 10px;
  font-size: 10px;
  cursor: pointer;
`;

export default CookItem;
