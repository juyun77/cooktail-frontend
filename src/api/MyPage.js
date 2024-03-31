import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 내 정보 조회
export const getMyInfo = async (token) => {
  try {
    const response = await api.get('/members/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('내 정보 조회 오류:', error);
    throw error;
  }
};


// 내 정보 수정
export const changeMyInfo = async (myInfoRq, image, token) => {
  try {
    const formData = new FormData();
    formData.append('image', image); // 이미지 파일 첨부
    Object.entries(myInfoRq).forEach(([key, value]) => {
      formData.append(key, value); // 기타 필드 추가
    });

    const response = await api.patch('/members/me', formData, {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰 헤더에 추가
        'Content-Type': 'multipart/form-data', // 파일 업로드를 위해 필요한 헤더
      },
    });
    return response.data;
  } catch (error) {
    console.error('내 정보 수정 오류:', error);
    throw error; // 오류를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};

// 비밀번호 변경
export const changePassword = async (passwordData, token) => {
  try {
    const response = await api.patch('/members/password', passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('비밀번호 변경 오류:', error);
    throw error;
  }
};

// 다른 유저의 프로필 정보 조회
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/members/${userId}`);
    return response.data;
  } catch (error) {
    console.error('다른 유저의 프로필 정보 조회 오류:', error);
    throw error;
  }
};

// 본인이 작성한 칵테일 글 조회
export const getMyCocktails = async (token) => {
  try {
    const response = await api.get('/cocktails/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('본인이 작성한 글 조회 오류:', error);
    throw error;
  }
};

// 본인이 작성한 안주 글 조회
export const getMyCooks = async (token) => {
  try {
    const response = await api.get('/cooks/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('본인이 작성한 글 조회 오류:', error);
    throw error;
  }
};

// 좋아요한 칵테일 글 조회
export const getLikedCocktails = async (token) => {
  try {
    const response = await api.get('/cocktails/like', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('좋아요한 칵테일 글 조회 오류:', error);
    throw error;
  }
};

// 좋아요한 안주 글 조회
export const getLikedCooks = async (token) => {
  try {
    const response = await api.get('/cooks/like', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('좋아요한 칵테일 글 조회 오류:', error);
    throw error;
  }
};