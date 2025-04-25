'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import Image from 'next/image';
import { login } from '../../../token';
import '../../../public/styles/login1.css';
import '../../../public/styles/google.css';
// import { GoogleLogin, CredentialResponse } from '@react-oauth/google'; // 구글 관련 주석 처리

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

          alert(`WELCOME to Hacker's playground, ${nickName}!`);
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

  // const handleGoogleLoginSuccess = (response: CredentialResponse) => {
  //   const { credential } = response;
  //   if (credential) {
  //     console.log('Google 로그인 성공:', credential);
  //     alert('Google 로그인 성공!');
  //     router.push('/');
  //   }
  // };

  // const handleGoogleLoginFailure = () => {
  //   console.error('Google 로그인 실패');
  //   setErrorMessage('Google 로그인에 실패했습니다.');
  // };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__forms">
          <form onSubmit={handleSubmit} className="login__register" id="login-in">
            <h1 className="login__title">로그인</h1>

            {errorMessage && <p className="login__error">{errorMessage}</p>}

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="아이디"
                className="login__input"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login__box">
              <i className="bx bx-lock login__icon"></i>
              <input
                type="password"
                placeholder="비밀번호"
                className="login__input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <a href="#" className="login__forgot">비밀번호 찾기</a>
            {/* <div className="login__external-options">
              <button
                className="login__github"
                onClick={() => alert('GitHub 로그인 버튼 클릭됨!')}
              >
                <Image
                  src="/images/github.png"
                  alt="GitHub Login"
                  width={50}
                  height={50}
                  className="login__image"
                />
              </button>

              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
                useOneTap
              />
            </div> */}

            <button
              type="submit"
              className="login__button"
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>

            <Link href="/signup" className="login__signin login__signin--signup">
              회원가입
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
