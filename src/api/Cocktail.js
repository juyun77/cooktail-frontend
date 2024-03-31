import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 글 생성
export const createCocktail = async (formData, token) => {
  try {
    const formDataWithImages = new FormData();
    formDataWithImages.append('title', formData.title);
    formDataWithImages.append('description', formData.description);
    formDataWithImages.append('ingredient', formData.ingredient);
    formDataWithImages.append('recipe', formData.recipe);
    formDataWithImages.append('abv', formData.abv);
    // 이미지 파일들을 FormData에 추가
    formData.images.forEach((image) => {
      formDataWithImages.append('images', image); // 수정 필요: formDataWithImages 사용
    });

    const response = await api.post('/cocktails', formDataWithImages, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 이미지를 함께 전송할 때는 'multipart/form-data'로 설정
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error creating cocktail: ${error.message}`);
  }
};

export const updateCocktail = async (cocktailId, formData, token) => {
  try {
    const formDataWithImages = new FormData();
    formDataWithImages.append('title', formData.title);
    formDataWithImages.append('description', formData.description);
    formDataWithImages.append('ingredient', formData.ingredient);
    formDataWithImages.append('recipe', formData.recipe);
    formDataWithImages.append('abv', formData.abv);
    
    // 이미지 배열이 정의되어 있는지 확인 후에 이미지를 formData에 추가
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((image) => {
        formDataWithImages.append('images', image);
      });
    }

    const response = await api.put(`/cocktails/${cocktailId}`, formDataWithImages, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating cocktail: ${error.message}`);
  }
};



// 글 삭제
export const deleteCocktail = async (cocktailId, token) => {
  try {
    const response = await api.delete(`/cocktails/${cocktailId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting cocktail: ${error.message}`);
  }
};

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

  // 글 작성자 확인
  export const checkIsOwnCocktail = async (cocktailId, token) => {
    try {
      const response = await api.get(`/cocktails/${cocktailId}/isOwn`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error checking if the cocktail is owned by the user: ${error.message}`);
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
