import axios from 'axios';

// API URLs
const BASE_URL = 'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com';
const LOGIN_URL = `${BASE_URL}/login`;
const TOKEN_VALIDATE_URL = `${BASE_URL}/token-validate`;
const TOKEN_REFRESH_URL = `${BASE_URL}/reissue`;
const USER_INFO_URL = `${BASE_URL}/api/users`;

// 사용자 정보 타입 정의
interface UserInfo {
  id: number;
  name: string;
  email: string;
  nickname: string;
  membershipId: string;
}

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그인 요청
export const login = async (account: string, password: string) => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, { account, password });
    const { jwtToken, refreshToken, nickName, membershipId } = response.data;

    setTokens(jwtToken, refreshToken);
    localStorage.setItem('nickname', nickName);
    localStorage.setItem('membershipId', membershipId);

    setAxiosDefaults(jwtToken);

    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

// 토큰 검증 요청
export const validateToken = async (jwtToken: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(TOKEN_VALIDATE_URL, { jwtToken });
    return response.data === true;
  } catch (error) {
    console.error('토큰 검증 실패:', error);
    return false;
  }
};

// 리프레시 토큰을 통한 액세스 토큰 갱신 요청
export const refreshAccessToken = async (
  membershipId: string,
  jwtToken: string,
  refreshToken: string
): Promise<string | null> => {
  try {
    const response = await axiosInstance.post(TOKEN_REFRESH_URL, {
      membershipId,
      jwtToken,
      refreshToken,
    });

    const { jwtToken: newJwtToken, refreshToken: newRefreshToken } = response.data;
    setTokens(newJwtToken, newRefreshToken);

    setAxiosDefaults(newJwtToken);

    return newJwtToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
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

    const jwtToken = await getToken();
    if (!jwtToken) {
      throw new Error('JWT token not available');
    }

    const response = await axiosInstance.get<UserInfo>(`${USER_INFO_URL}/${membershipId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
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
export const setTokens = (jwtToken: string, refreshToken: string) => {
  localStorage.setItem('jwtToken', jwtToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getJwtToken = () => localStorage.getItem('jwtToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const getMembershipId = () => localStorage.getItem('membershipId');

export const clearTokens = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('membershipId');
};

// 유효한 JWT 토큰을 반환하는 함수
export const getToken = async (): Promise<string | null> => {
  let jwtToken = getJwtToken();
  const refreshToken = getRefreshToken();
  const membershipId = getMembershipId();

  if (!jwtToken && refreshToken && membershipId) {
    jwtToken = await refreshAccessToken(membershipId, '', refreshToken);
  }

  if (jwtToken) {
    const isValid = await validateToken(jwtToken);
    if (!isValid && refreshToken && membershipId) {
      jwtToken = await refreshAccessToken(membershipId, jwtToken, refreshToken);
    }
  }

  if (!jwtToken) {
    return null;
  }

  return jwtToken;
};

// Axios 기본 헤더 설정
export const setAxiosDefaults = (jwtToken: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
};
