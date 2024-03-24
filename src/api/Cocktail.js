import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
  // 모든 글 조회, 검색
export const getAllCocktails = async ({ page = 0, perPage = 8, sortBy = 'createdAt', keyword } = {}) => {
  try {
    const response = await api.get('/cocktails', {
      params: {
        page,
        size: perPage,
        sort: sortBy,
        keyword,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching cocktails: ${error.message}`);
  }
};

  // id로 조회
  export const getCocktailById = async (id) => {
    try {
      const response = await api.get(`/cocktails/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cocktail by id: ${error.message}`);
    }
  };
// 좋아요 추가
export const addLike = async (cocktailId, token) => {
  try {
    const response = await api.post(`/cocktails/like/${cocktailId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding like:', error.response); // Log the full error response

    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message || '좋아요 추가 중 오류가 발생했습니다.';
      
      if (errorMessage.includes("자신이 작성한 글에는 좋아요를 누를 수 없습니다.")) {
        alert('자신이 작성한 글에는 좋아요를 누를 수 없습니다.');
      } else {
        alert(errorMessage);
      }
    } else {
      alert('좋아요 추가 중 오류가 발생했습니다.');
    }

    throw new Error(`Error adding like: ${error.message}`);
  }
};

  
  // 좋아요 취소
  export const deleteLike = async (cocktailId, token) => {
    try {
      const response = await api.delete(`/cocktails/like/${cocktailId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting like: ${error.message}`);
    }
  };

  // 좋아요 상태 확인
export const checkLikeStatus = async (cocktailId, token) => {
  try {
    const response = await api.get(`/cocktails/like/${cocktailId}/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error checking like status: ${error.message}`);
  }
};
