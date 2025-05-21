import React, { useEffect, useState } from 'react';
import axios from 'axios';

// API URLs
const BASE_URL = 'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com';
const LOGIN_URL = `${BASE_URL}/login`;
const TOKEN_VALIDATE_URL = `${BASE_URL}/token-validate`;
const TOKEN_REFRESH_URL = `${BASE_URL}/reissue`;
const USER_INFO_URL = `${BASE_URL}/api/users`;

// 사용자 정보 타입
interface UserInfo {
  id: number;
  name: string;
  email: string;
  nickname: string;
  membershipId: string;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AuthPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 토큰 및 로컬스토리지 관련 함수들
  const setTokens = (jwtToken: string, refreshToken: string) => {
    localStorage.setItem('jwtToken', jwtToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  const getJwtToken = () => localStorage.getItem('jwtToken');
  const getRefreshToken = () => localStorage.getItem('refreshToken');
  const getMembershipId = () => localStorage.getItem('membershipId');

  const clearTokens = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('membershipId');
    localStorage.removeItem('nickname');
  };

  const setAxiosDefaults = (jwtToken: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  };

  // URL에서 토큰 파싱 후 저장 (소셜 로그인 콜백 처리)
  const parseAndStoreTokenFromURL = (): boolean => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const { nickname, userId } = payload;

        setTokens(token, ""); // refreshToken 빈값 처리
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("membershipId", userId.toString());

        setAxiosDefaults(token);

        // URL에서 토큰 쿼리 제거 (선택)
        window.history.replaceState({}, document.title, window.location.pathname);

        console.log("토큰 및 사용자 정보가 저장되었습니다.");
        return true;
      } catch (error) {
        console.error("토큰 파싱 중 오류 발생:", error);
        return false;
      }
    } else {
      return false;
    }
  };

  // 토큰 검증
  const validateToken = async (jwtToken: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.post(TOKEN_VALIDATE_URL, { jwtToken });
      return response.data === true;
    } catch (error) {
      console.error('토큰 검증 실패:', error);
      return false;
    }
  };

  // 토큰 갱신
  const refreshAccessToken = async (
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

  // 유효한 토큰 얻기
  const getToken = async (): Promise<string | null> => {
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

  // 사용자 정보 조회
  const getUserInfo = async (): Promise<UserInfo> => {
    const membershipId = getMembershipId();
    if (!membershipId) throw new Error('Membership ID not available');

    const jwtToken = await getToken();
    if (!jwtToken) throw new Error('JWT token not available');

    const response = await axiosInstance.get<UserInfo>(`${USER_INFO_URL}/${membershipId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    return response.data;
  };

  // 닉네임 가져오기
  const getUserNickname = async (): Promise<string | null> => {
    const nickname = localStorage.getItem('nickname');
    if (nickname) return nickname;

    try {
      const userInfo = await getUserInfo();
      return userInfo.nickname;
    } catch (error) {
      console.error('닉네임 가져오기 실패:', error);
      return null;
    }
  };

  // 일반 로그인 함수 (계정, 비번으로 로그인)
  const login = async (account: string, password: string) => {
    try {
      const response = await axiosInstance.post(LOGIN_URL, { account, password });
      const { jwtToken, refreshToken, nickName, membershipId } = response.data;

      setTokens(jwtToken, refreshToken);
      localStorage.setItem('nickname', nickName);
      localStorage.setItem('membershipId', membershipId);

      setAxiosDefaults(jwtToken);

      setNickname(nickName);
      setIsLoggedIn(true);
      setError(null);
    } catch (error) {
      console.error('로그인 실패:', error);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 초기 로직 - 소셜 토큰 처리 or 기존 토큰 검증
  useEffect(() => {
    (async () => {
      setLoading(true);

      const socialLoginSuccess = parseAndStoreTokenFromURL();

      if (socialLoginSuccess) {
        const nick = await getUserNickname();
        setNickname(nick);
        setIsLoggedIn(true);
        setLoading(false);
        return;
      }

      // 소셜 로그인 토큰 없으면 기존 토큰 유효성 검사
      const token = await getToken();
      if (token) {
        const nick = await getUserNickname();
        setNickname(nick);
        setIsLoggedIn(true);
      } else {
        clearTokens();
        setIsLoggedIn(false);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  if (isLoggedIn)
    return (
      <div>
        <h2>{nickname}님, 환영합니다!</h2>
        <button
          onClick={() => {
            clearTokens();
            setIsLoggedIn(false);
            setNickname(null);
          }}
        >
          로그아웃
        </button>
      </div>
    );

  return (
    <div>
      <h2>로그인</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="계정"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={() => login(account, password)}>로그인</button>
    </div>
  );
};

export default AuthPage;