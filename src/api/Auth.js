import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const signUp = async (formData) => {
  try {
    const response = await api.post('/members', formData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('회원가입 실패');
    }
  } catch (error) {
    console.error('회원가입 중 에러 발생:', error.message);

    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      
      if (error.message.includes('중복된 이메일입니다.')) {
        alert('중복된 이메일입니다. 다른 이메일을 사용해주세요.');
      } else if (error.message.includes('중복된 닉네임입니다.')) {
        alert('중복된 닉네임입니다. 다른 닉네임을 사용해주세요.');
      } else {
        alert(errorMessage);
      }
    } else {
      alert('회원가입 중 오류가 발생했습니다.');
    }

    
    
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/members/login', {
      email,
      password,
    });

    if (response.status === 200) {
      // 토큰을 쿠키에 저장
      document.cookie = `token=${response.data.token}; path=/;`;
      return { token: response.data.token, memberId: response.data.memberId };
    } else {
      throw new Error('로그인 실패');
    }
  } catch (error) {
    console.error('로그인 중 에러 발생:', error.message);
    throw error;
  }
};

// 추가된 함수
export const getMyInfo = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }

    const response = await api.get('/members/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('내 정보 조회 실패');
    }
  } catch (error) {
    console.error('내 정보 조회 중 에러 발생:', error.message);
    throw error;
  }
};

// 쿠키에서 토큰을 가져오는 함수를 추가
export const getToken = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      return value;
    }
  }
  return null;
};

// 로그아웃 시 쿠키에서 토큰을 제거하는 함수를 추가
export const logout = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  localStorage.removeItem('memberId');
};
