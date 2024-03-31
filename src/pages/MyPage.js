import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/mypage/Sidebar';
import { getToken } from '../api/Auth';
import { getMyInfo, changeMyInfo, changePassword } from '../api/MyPage';
import editIcon from '../assets/images/edit.png';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    nickname: '',
    phone: '',
    birthDate: '',
    bio: '',
    // 기타 필요한 폼 필드 추가
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await getToken();
        const userData = await getMyInfo(token);
        setUserInfo(userData);
        setFormValues({
          name: userData.name,
          nickname: userData.nickname,
          phone: userData.phone,
          birthDate: userData.birthDate,
          bio: userData.bio,
          image: userData.image,
          // 기타 필요한 필드 초기화
        });
      } catch (error) {
        console.error('사용자 정보 가져오기 오류:', error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProfileImage(imageFile);
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await changeMyInfo(formValues, profileImage, token);
      window.location.reload();
    } catch (error) {
      console.error('내 정보 수정 오류:', error);
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordChange = async () => {
    const { newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      alert('새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    try {
      const token = await getToken(); // Get token
      await changePassword(passwordData, token); // Call API to change password
      setIsModalOpen(false);
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Header />
      <BoardTitle>마이페이지</BoardTitle>
      <Layout>
      <Sidebar />
      <Container>
        {userInfo ? (
          <form onSubmit={handleSubmit}>
            <UserInfoContainer>
            <ProfileInfo>
            <ProfilePicture>
                {profileImagePreview ? (
                  <img src={profileImagePreview} alt="프로필 이미지 미리보기" />
                ) : (
                  <img src={userInfo.image} alt="프로필 이미지" />
                )}
              </ProfilePicture>
              <UserInfoColumn>
              <UserInfoItem>
                <label htmlFor="nickname">닉네임</label>
                <input type="text" id="nickname" name="nickname" value={formValues.nickname} onChange={handleChange} placeholder="닉네임을 입력하세요" />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="bio">소개</label>
                <textarea id="bio" name="bio" value={formValues.bio} onChange={handleChange} placeholder="소개를 입력하세요" />
              </UserInfoItem>
            </UserInfoColumn>
            </ProfileInfo>
              <UserInfoItem>
                <label htmlFor="profileImage">프로필 이미지</label>
                <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} accept="image/*" />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="email">이메일</label>
                <input type="text" id="email" name="email" value={userInfo.email} disabled />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="name">이름</label>
                <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange} placeholder="이름을 입력하세요" />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="phone">전화번호</label>
                <input type="text" id="phone" name="phone" value={formValues.phone} onChange={handleChange} placeholder="전화번호를 입력하세요"/>
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="birthDate">생년월일</label>
                <input type="date" id="birthDate" name="birthDate" value={formValues.birthDate} onChange={handleChange} />
              </UserInfoItem>
            </UserInfoContainer>
            <SubmitButton type="submit">수정</SubmitButton>
          </form>
        ) : (
          <LoadingMessage>사용자 정보를 불러오는 중...</LoadingMessage>
        )}
        <ChangePasswordButton onClick={handleOpenModal}>비밀번호 변경</ChangePasswordButton>
      </Container>
      </Layout>
      <Footer />

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>비밀번호 변경</ModalTitle>
              <CloseModalButton onClick={handleCloseModal}>닫기</CloseModalButton>
            </ModalHeader>
            <ModalContent>
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <input type="password" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordInputChange} />
              <label htmlFor="newPassword">새로운 비밀번호</label>
              <input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordInputChange} />
              <label htmlFor="confirmPassword">새로운 비밀번호 확인</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordInputChange} />
              <ChangePasswordSubmitButton onClick={handlePasswordChange}>변경</ChangePasswordSubmitButton>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BoardTitle = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

const UserInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
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

const UserInfoContainer = styled.div`
  flex: 1;
`;

const UserInfoItem = styled.div`
  margin-bottom: 20px;

  label {
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const LoadingMessage = styled.div`
  font-size: 16px;
  text-align: center;
  margin-top: 50px;
`;

const ProfilePicture = styled.div`
  position: relative;
  margin-bottom: 20px;
  margin-right: 30px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SubmitButton = styled.button`
  background-color: #C8256A;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  margin-top: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
`;

const CloseModalButton = styled.button`
  background-color: #ccc;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
`;

const ChangePasswordButton = styled.button`
  background-color: transparent;
  border: none;
  color: #C8256A;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const ChangePasswordSubmitButton = styled.button`
  background-color: #C8256A;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
`;


export default MyPage;
