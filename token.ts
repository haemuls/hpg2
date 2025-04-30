import axios from 'axios';

// API URLs
const BASE_URL = 'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com'; // API 기본 주소
const LOGIN_URL = `${BASE_URL}/login`; // 로그인 요청 URL
const TOKEN_VALIDATE_URL = `${BASE_URL}/token-validate`; // 토큰 검증 요청 URL
const TOKEN_REFRESH_URL = `${BASE_URL}/reissue`; // 액세스 토큰 갱신 URL
const USER_INFO_URL = `${BASE_URL}/api/users`; // 사용자 정보 요청 URL

// 사용자 정보 타입 정의
interface UserInfo {
  id: number;
  name: string;
  email: string;
  nickname: string;
  membershipId: string;
}

// 로그인 요청
export const login = async (account: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_URL, { account, password });
    const { jwtToken, refreshToken, nickName, membershipId } = response.data;

    setTokens(jwtToken, refreshToken); // 토큰 저장
    localStorage.setItem('nickname', nickName);
    localStorage.setItem('membershipId', membershipId);

    setAxiosDefaults();

    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

// 토큰 검증 요청
export const validateToken = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await axios.post(TOKEN_VALIDATE_URL, { jwtToken: accessToken });
    return response.data === true;
  } catch (error) {
    console.error('토큰 검증 실패:', error);
    return false;
  }
};

// 리프레시 토큰을 통한 액세스 토큰 갱신 요청
export const refreshAccessToken = async (
  membershipId: string,
  accessToken: string,
  refreshToken: string
): Promise<string | null> => {
  try {
    const response = await axios.post(TOKEN_REFRESH_URL, {
      membershipId,
      jwtToken: accessToken,
      refreshToken,
    });

    const { jwtToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
    setTokens(newAccessToken, newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    handleTokenError(); // 실패 시 처리
    return null;
  }
};

// 사용자 정보 요청
export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const membershipId = localStorage.getItem('membershipId');
    if (!membershipId) {
      throw new Error('Membership ID not available');
    }

    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      throw new Error('Access token not available');
    }

    const response = await axios.get<UserInfo>(`${USER_INFO_URL}/${membershipId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
    throw error;
  }
};

// 닉네임 가져오기
export const getUserNickname = async (): Promise<string | null> => {
  const nickname = localStorage.getItem('nickname');
  if (nickname) {
    return nickname;
  }

  try {
    const userInfo = await getUserInfo();
    return userInfo.nickname;
  } catch (error) {
    console.error('닉네임 가져오기 실패:', error);
    return null;
  }
};

// 토큰 관리 함수
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('jwtToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => localStorage.getItem('jwtToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const getMembershipId = () => localStorage.getItem('membershipId');

export const clearTokens = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('membershipId');
};

// 유효한 액세스 토큰을 반환하는 함수
export const getValidAccessToken = async (): Promise<string | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    handleTokenError(); // 실패 처리
    return null;
  }

  const isValid = await validateToken(accessToken);
  if (!isValid) {
    const refreshToken = getRefreshToken();
    const membershipId = getMembershipId();
    if (refreshToken && membershipId) {
      const newAccessToken = await refreshAccessToken(membershipId, accessToken, refreshToken);
      if (!newAccessToken) {
        handleTokenError(); // 실패 처리
        return null;
      }

      // 새로 발급받은 액세스 토큰을 Axios 기본 헤더에 반영
      axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

      return newAccessToken;
    }
    handleTokenError(); // 실패 처리
    return null;
  }

  return accessToken;
};

// 토큰 관련 에러 처리
export const handleTokenError = () => {
  clearTokens();
  window.location.href = '/login'; // 로그인 페이지로 이동
};

// Axios 기본 헤더 설정
export const setAxiosDefaults = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
};

// Axios 전역 에러 처리
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      handleTokenError(); // 401 에러 시 처리
    }
    return Promise.reject(error);
  }
);
