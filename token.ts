import axios from 'axios';

// API URLs
const BASE_URL = 'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com'; // api 기본주소
const LOGIN_URL = `${BASE_URL}/login`; // 로그인 요청 url
const TOKEN_VALIDATE_URL = `${BASE_URL}/token-validate`; // 토큰 검증 요청 url
const TOKEN_REFRESH_URL = `${BASE_URL}/reissue`; // 엑세스 토큰 갱신
const USER_INFO_URL = `${BASE_URL}/api/users`; // 사용자 정보 가져오는 api

// 로그인 요청
export const login = async (account: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_URL, { account, password });
    const { jwtToken, refreshToken, nickName, membershipId } = response.data; // 서버 응답에서 jwtToken, refreshToken, nickName, membershipId 추출

    setTokens(jwtToken, refreshToken); // 토큰을 로컬 스토리지에 저장
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
    setTokens(newAccessToken, newRefreshToken); // 갱신된 refreshToken도 로컬 스토리지에 저장

    return newAccessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    clearTokens();
    return null;
  }
};

// 사용자 정보 요청
export const getUserInfo = async (): Promise<any> => {
  try {
    const membershipId = localStorage.getItem('membershipId');
    if (!membershipId) {
      throw new Error('Membership ID not available');
    }

    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      throw new Error('Access token not available');
    }

    // API 요청 보내기
    const response = await axios.get(`${USER_INFO_URL}/${membershipId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
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
  const accessToken = getAccessToken(); // jwtToken을 accessToken으로 대체
  if (!accessToken) {
    return null;
  }

  const isValid = await validateToken(accessToken); // accessToken으로 유효성 검사
  if (!isValid) {
    const refreshToken = getRefreshToken();
    const membershipId = getMembershipId();
    if (refreshToken && membershipId) {
      const newAccessToken = await refreshAccessToken(membershipId, accessToken, refreshToken); // 새로운 accessToken으로 갱신
      return newAccessToken;
    }
    return null;
  }

  return accessToken; // 유효한 accessToken 반환
};

// Axios 기본 헤더 설정
export const setAxiosDefaults = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
};
