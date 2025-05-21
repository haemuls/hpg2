import axios from "axios";

// API 기본 URL
const BASE_URL = "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";
const LOGIN_URL = `${BASE_URL}/login`;
const TOKEN_VALIDATE_URL = `${BASE_URL}/token-validate`;
const TOKEN_REFRESH_URL = `${BASE_URL}/reissue`;
const USER_INFO_URL = `${BASE_URL}/api/users`;

// 사용자 정보 타입 정의
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  nickname: string;
  membershipId: string;
}

// Axios 인스턴스 생성 및 기본 헤더 설정
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// URL 쿼리에서 소셜 로그인 토큰 파싱 (token 값만 반환)
export const parseTokenFromURL = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  if (!token) {
    console.warn("URL에 토큰이 포함되어 있지 않습니다.");
    return null;
  }
  return token;
};

// 일반 로그인 요청 함수 (계정/비밀번호 로그인)
export const login = async (
  account: string,
  password: string
): Promise<UserInfo | null> => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, { account, password });
    const { jwtToken, refreshToken, nickName, membershipId } = response.data;

    setTokens(jwtToken, refreshToken);
    localStorage.setItem("nickname", nickName);
    localStorage.setItem("membershipId", membershipId);

    setAxiosDefaults(jwtToken);

    return {
      id: Number(membershipId),
      name: "",
      email: "",
      nickname: nickName,
      membershipId: membershipId,
    };
  } catch (error) {
    console.error("로그인 실패:", error);
    return null;
  }
};

// 소셜 로그인 토큰을 서버에 보내 로그인 처리하는 함수
export const socialLogin = async (socialToken: string): Promise<UserInfo | null> => {
  try {
    // 서버에 token 전달하여 로그인 처리 (서버가 소셜 토큰을 받아 인증)
    const response = await axiosInstance.post(LOGIN_URL, { token: socialToken });

    const { jwtToken, refreshToken, nickName, membershipId } = response.data;

    setTokens(jwtToken, refreshToken);
    localStorage.setItem("nickname", nickName);
    localStorage.setItem("membershipId", membershipId);

    setAxiosDefaults(jwtToken);

    return {
      id: Number(membershipId),
      name: "",
      email: "",
      nickname: nickName,
      membershipId: membershipId,
    };
  } catch (error) {
    console.error("소셜 로그인 실패:", error);
    return null;
  }
};

// URL에서 소셜 로그인 토큰 파싱 후 서버에 보내 로그인 처리하고, 성공 시 토큰 저장까지 진행하는 함수
export const parseAndStoreTokenFromURL = async (): Promise<boolean> => {
  const socialToken = parseTokenFromURL();
  if (!socialToken) return false;

  const userInfo = await socialLogin(socialToken);
  if (!userInfo) return false;

  // 로그인 성공 시 URL에서 토큰 쿼리 제거 (선택 사항)
  window.history.replaceState(null, "", window.location.pathname);

  return true;
};

// JWT 토큰 유효성 검증
export const validateToken = async (jwtToken: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(TOKEN_VALIDATE_URL, { jwtToken });
    return response.data === true;
  } catch (error) {
    console.error("토큰 검증 실패:", error);
    return false;
  }
};

// 리프레시 토큰을 이용한 JWT 토큰 갱신
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
    console.error("토큰 갱신 실패:", error);
    clearTokens(); // 토큰 갱신 실패 시 토큰 제거
    return null;
  }
};

// 사용자 정보 요청 (membershipId 기반)
export const getUserInfo = async (): Promise<UserInfo> => {
  const membershipId = localStorage.getItem("membershipId");
  if (!membershipId) throw new Error("Membership ID not found");

  const jwtToken = await getToken();
  if (!jwtToken) throw new Error("JWT 토큰이 없습니다");

  try {
    const response = await axiosInstance.get<UserInfo>(
      `${USER_INFO_URL}/${membershipId}`,
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error);
    throw error;
  }
};

// 닉네임 반환, 없으면 사용자 정보에서 가져옴
export const getUserNickname = async (): Promise<string | null> => {
  const nickname = localStorage.getItem("nickname");
  if (nickname) return nickname;

  try {
    const userInfo = await getUserInfo();
    return userInfo.nickname;
  } catch (error) {
    console.error("닉네임 가져오기 실패:", error);
    return null;
  }
};

// 토큰 저장 함수
export const setTokens = (jwtToken: string, refreshToken: string) => {
  localStorage.setItem("jwtToken", jwtToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};

// 토큰 조회 함수
export const getJwtToken = (): string | null => localStorage.getItem("jwtToken");
export const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");
export const getMembershipId = (): string | null => localStorage.getItem("membershipId");

// 토큰 삭제 함수
export const clearTokens = (): void => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("membershipId");
};

// 유효한 JWT 토큰 반환 (필요 시 refreshToken으로 갱신)
export const getToken = async (): Promise<string | null> => {
  let jwtToken = getJwtToken();
  const refreshToken = getRefreshToken();
  const membershipId = getMembershipId();

  // jwtToken 없고 refreshToken 있으면 갱신 시도
  if (!jwtToken && refreshToken && membershipId) {
    jwtToken = await refreshAccessToken(membershipId, "", refreshToken);
  }

  if (jwtToken) {
    const isValid = await validateToken(jwtToken);
    if (!isValid && refreshToken && membershipId) {
      jwtToken = await refreshAccessToken(membershipId, jwtToken, refreshToken);
    }
  }

  if (!jwtToken) {
    clearTokens();
    return null;
  }

  return jwtToken;
};

// Axios 기본 Authorization 헤더 설정
export const setAxiosDefaults = (jwtToken: string): void => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
};

export default axiosInstance;
