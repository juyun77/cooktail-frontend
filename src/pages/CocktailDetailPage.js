import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getCocktailById, addLike, deleteLike, checkLikeStatus } from '../api/Cocktail';
import { getToken } from '../api/Auth';
import { useParams } from 'react-router-dom';

// 좋아요 아이콘 import
import likeIcon from '../assets/images/like.png';
import likedIcon from '../assets/images/liked.png';

const CocktailDetailPage = () => {
  const { id } = useParams(); 

  const [cocktail, setCocktail] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false); // 좋아요 상태 추가

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const cocktailData = await getCocktailById(id);
        setCocktail(cocktailData);
        setMainImage(cocktailData.images[0]);
        setThumbnails(cocktailData.images.slice(1));

        // Check the initial like status
        const token = getToken();

        const initialLikeStatus = await checkLikeStatus(id, token);
        setLikeStatus(initialLikeStatus);
      } catch (error) {
        console.error('Error fetching cocktail:', error);
      }
    };

    fetchCocktail();
  }, [id]);

  if (!cocktail) {
    return <div>Loading...</div>;
  }

  const handleThumbnailClick = (clickedImage) => {
    setThumbnails((prevThumbnails) => {
      const updatedThumbnails = [...prevThumbnails, mainImage];
      setMainImage(clickedImage);
      return updatedThumbnails.filter((thumbnail) => thumbnail !== clickedImage);
    });
  };
  
  const handleLikeClick = async () => {
    try {
      const token = getToken();

      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }
      
      const likeStatus = await checkLikeStatus(id, token);

      if (likeStatus) {
        await deleteLike(id, token);
      } else {
        await addLike(id, token);
      }

      const updatedCocktail = await getCocktailById(id);
      setCocktail(updatedCocktail);

      // Toggle the like status
      setLikeStatus(!likeStatus);
    } catch (error) {
      console.error('Error handling like click:', error);
    }
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('ko-KR', options);
  };

  return (
    <>
      <Header />
      <BoardTitle>{cocktail?.title || 'Untitled Cocktail'}</BoardTitle>
      <Container>
        <ImagesContainer>
          <MainImage src={mainImage} alt="Main Cocktail Image" />
          <ThumbnailContainer>
            {thumbnails.map((thumbnail, index) => (
              <Thumbnail
                key={index}
                src={thumbnail}
                alt={`Cocktail Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(thumbnail)}
              />
            ))}
          </ThumbnailContainer>
        </ImagesContainer>
        <ExplainContainer>
          <InfoContainer>
            <Info>
              <User>{cocktail?.member?.nickname}님의 레시피</User>
              <Abv>도수: {cocktail?.abv}</Abv>
              <LikeIcon src={likeStatus ? likedIcon : likeIcon} alt="Like Icon" onClick={handleLikeClick} style={{ cursor: 'pointer' }} />
              <Like>좋아요 {cocktail?.likes}</Like>
              <View>조회수 {cocktail?.views}</View>
            </Info>
            <Details>
              <Section>
                <Title>칵테일 설명</Title>
                <Content>{cocktail?.description}</Content>
              </Section>
              <Section>
                <Title>재료 정보</Title>
                <Content>{cocktail?.ingredient}</Content>
              </Section>
              <Section>
                <Title>레시피 설명</Title>
                <Content>{cocktail?.recipe}</Content>
              </Section>
            </Details>
          </InfoContainer>
          <DateContainer>
            <DateSpan>작성일: {formatDate(cocktail?.createdAt)}</DateSpan>
            {cocktail?.createdAt !== cocktail?.updatedAt && (
              <DateSpan>수정일: {formatDate(cocktail?.updatedAt)}</DateSpan>
            )}
          </DateContainer>
        </ExplainContainer>
      </Container>
      <Footer />
    </>
  );
};

const BoardTitle = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1258px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.img`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 25px;
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
`;

const ExplainContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;

const Info = styled.div`
  display: flex;
  padding-left: 70px;
`;

const User = styled.button`
  margin-left: 35px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  background-color: #C8256A;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
`;

const Abv = styled.button`
  margin-left: 18px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  background-color: #C8256A;
  color: #fff;
  border-radius: 10px;
  font-size: 18px;
`;

const Like = styled.span`
  font-size: 20px;
  padding: 8px;
  color: #C8256A;
`;

const View = styled.span`
  font-size: 20px;
  margin-left: 5px;
  padding: 8px;
  color: #C8256A;
`;

const Details = styled.div`
  margin-top: 20px;
  padding-left: 80px;
  padding-right: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 25px;
  color: #C8256A;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const DateContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 40px;
`;

const DateSpan = styled.span`
  font-size: 14px;
  color: #777;
  margin-right: 10px;
`;

const LikeIcon = styled.img`
  width: 33px;
  height: 33px;
  margin-left: 20px;
`;



export default CocktailDetailPage;
