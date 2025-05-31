import axios from "axios";

// API 기본 URL
const BASE_URL = "https://api.hpground.xyz";
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
  console.debug("parseTokenFromURL - Parsed token:", token);
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
  console.debug("login - Login attempt with account:", account);
  try {
    const response = await axiosInstance.post(LOGIN_URL, { account, password });
    console.debug("login - Response data:", response.data);

    const { jwtToken, refreshToken, nickName, membershipId } = response.data;
    console.debug("login - Tokens received: jwtToken, refreshToken:", jwtToken, refreshToken);

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
  console.debug("socialLogin - Social token received:", socialToken);
  try {
    const response = await axiosInstance.post(LOGIN_URL, { token: socialToken });
    console.debug("socialLogin - Response data:", response.data);

    const { jwtToken, refreshToken, nickName, membershipId } = response.data;
    console.debug("socialLogin - Tokens received: jwtToken, refreshToken:", jwtToken, refreshToken);

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

export const parseAndStoreTokenFromURL = async (): Promise<boolean> => {
  console.debug("parseAndStoreTokenFromURL - Start");
  try {
    const socialToken = parseTokenFromURL();
    console.debug("parseAndStoreTokenFromURL - Social token:", socialToken);
    if (!socialToken) return false;

    const userInfo = await socialLogin(socialToken);
    console.debug("parseAndStoreTokenFromURL - User info:", userInfo);
    if (!userInfo) return false;

    // URL에서 토큰 쿼리 제거 (주소창 정리)
    window.history.replaceState(null, "", window.location.pathname);

    console.debug("parseAndStoreTokenFromURL - Tokens in localStorage:", {
      jwtToken: localStorage.getItem("jwtToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      nickname: localStorage.getItem("nickname"),
      membershipId: localStorage.getItem("membershipId"),
    });

    window.location.href = "/";
    return true;
  } catch (error) {
    console.error("parseAndStoreTokenFromURL error:", error);
    return false;
  }
};

// JWT 토큰 유효성 검증
export const validateToken = async (jwtToken: string): Promise<boolean> => {
  console.debug("validateToken - Validating JWT token:", jwtToken);
  try {
    const response = await axiosInstance.post(TOKEN_VALIDATE_URL, { jwtToken });
    console.debug("validateToken - Response data:", response.data);
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
  console.debug("refreshAccessToken - Refreshing tokens:", {
    membershipId,
    jwtToken,
    refreshToken,
  });
  try {
    const response = await axiosInstance.post(TOKEN_REFRESH_URL, {
      membershipId,
      jwtToken,
      refreshToken,
    });
    console.debug("refreshAccessToken - Response data:", response.data);

    const { jwtToken: newJwtToken, refreshToken: newRefreshToken } = response.data;
    setTokens(newJwtToken, newRefreshToken);
    setAxiosDefaults(newJwtToken);

    return newJwtToken;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    clearTokens();
    return null;
  }
};

// 사용자 정보 요청 (membershipId 기반)
export const getUserInfo = async (): Promise<UserInfo> => {
  const membershipId = localStorage.getItem("membershipId");
  console.debug("getUserInfo - Membership ID:", membershipId);
  if (!membershipId) throw new Error("Membership ID not found");

  const jwtToken = await getToken();
  console.debug("getUserInfo - JWT token:", jwtToken);
  if (!jwtToken) throw new Error("JWT 토큰이 없습니다");

  try {
    const response = await axiosInstance.get<UserInfo>(
      `${USER_INFO_URL}/${membershipId}`,
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );
    console.debug("getUserInfo - Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error);
    throw error;
  }
};

// 닉네임 반환, 없으면 사용자 정보에서 가져옴
export const getUserNickname = async (): Promise<string | null> => {
  const nickname = localStorage.getItem("nickname");
  console.debug("getUserNickname - LocalStorage nickname:", nickname);
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
  console.debug("setTokens - Storing tokens:", { jwtToken, refreshToken });
  localStorage.setItem("jwtToken", jwtToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};

// 토큰 조회 함수
export const getJwtToken = (): string | null => localStorage.getItem("jwtToken");
export const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");
export const getMembershipId = (): string | null => localStorage.getItem("membershipId");

// 토큰 삭제 함수
export const clearTokens = (): void => {
  console.debug("clearTokens - Clearing tokens");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("membershipId");
  localStorage.removeItem("nickname");
};

// 유효한 JWT 토큰 반환 (필요 시 refreshToken으로 갱신)
export const getToken = async (): Promise<string | null> => {
  console.debug("getToken - Fetching token");
  let jwtToken = getJwtToken();
  const refreshToken = getRefreshToken();
  const membershipId = getMembershipId();

  if (!jwtToken && refreshToken && membershipId) {
    jwtToken = await refreshAccessToken(membershipId, "", refreshToken);
  }

  if (jwtToken) {
    const isValid = await validateToken(jwtToken);
    console.debug("getToken - Token valid:", isValid);
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
  console.debug("setAxiosDefaults - Setting default headers with JWT token:", jwtToken);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
};

export default axiosInstance;
