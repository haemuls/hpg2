'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../../token';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Open Sans", sans-serif;
    font-size: 0.938rem;
    color: #23004d;
  }

  h1 {
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`;

const animateLogin = keyframes`
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
`;

// 스타일 컴포넌트 정의
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 1.5rem;
`;

const LoginContent = styled.div`
  display: grid;
`;

const LoginForms = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 130%;
`;

const LoginForm = styled.form`
  width: 100%;
  background-color: #f2f2f2;
  padding: 2rem 1rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(35, 0, 77, 0.2);
  animation: ${animateLogin} 0.4s ease-in-out;
`;

const LoginTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const LoginBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 0.5rem;
  padding: 1.125rem 1rem;
  background-color: #fff;
  margin-top: 1rem;
  border-radius: 0.5rem;
`;

const LoginIcon = styled.i`
  font-size: 1.5rem;
  color: #4ad395;
`;

const LoginInput = styled.input`
  border: none;
  outline: none;
  font-size: 0.938rem;
  font-weight: 700;
  color: #23004d;
  width: 100%;

  ::placeholder {
    font-size: 0.938rem;
    font-family: "Open Sans", sans-serif;
    color: #a49eac;
  }
`;

const LoginForgot = styled.a`
  display: block;
  width: max-content;
  margin-left: auto;
  margin-top: 0.5rem;
  font-size: 0.813rem;
  font-weight: 600;
  color: #a49eac;
`;

const LoginButton = styled.button`
  margin-top: 16px;
  display: block;
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  margin: 2rem auto;
  background-color: #4ad395;
  color: #fff;
  font-weight: 600;
  text-align: center;
  border-radius: 0.5rem;
  transition: 0.3s;

  &:hover {
    background-color: #65bf97;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const LoginSignin = styled(Link)`
  font-weight: 600;
  font-size: 0.813rem;
  color: #4ad395;
  cursor: pointer;
`;

const SocialButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #4ad395;
  color: #fff;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #65bf97;
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await login(username, password);

      if (response?.jwtToken) {
        const { jwtToken, refreshToken, membershipId, nickName } = response;

        if (jwtToken && membershipId && nickName) {
          localStorage.setItem('jwtToken', jwtToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('membershipId', membershipId);
          localStorage.setItem('nickname', nickName);

          const event = new CustomEvent('nicknameUpdated', { detail: nickName });
          window.dispatchEvent(event);
          router.push('/');
        } else {
          setErrorMessage('잘못된 응답을 받았습니다. 다시 시도해 주세요.');
        }
      } else {
        setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setErrorMessage('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const redirectToOAuth = (provider: string) => {
    window.location.href = `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/${provider}`;
  };

  return (
    <>
      <GlobalStyle />
      <LoginWrapper>
        <LoginContent>
          <LoginForms>
            <LoginForm onSubmit={handleSubmit}>
              <LoginTitle>로그인</LoginTitle>
              {errorMessage && <p>{errorMessage}</p>}
              <LoginBox>
                <LoginIcon className="bx bx-user" />
                <LoginInput
                  type="text"
                  placeholder="아이디"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </LoginBox>
              <LoginBox>
                <LoginIcon className="bx bx-lock" />
                <LoginInput
                  type="password"
                  placeholder="비밀번호"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </LoginBox>
              <LoginForgot href="#">비밀번호 찾기</LoginForgot>
              <LoginButton type="submit" disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
              </LoginButton>
              <LoginSignin href="/signup">회원가입</LoginSignin>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <SocialButton onClick={() => redirectToOAuth('google')}>Google로 로그인</SocialButton>
                <SocialButton onClick={() => redirectToOAuth('github')}>GitHub로 로그인</SocialButton>
              </div>
            </LoginForm>
          </LoginForms>
        </LoginContent>
      </LoginWrapper>
    </>
  );
};

export default LoginPage;
