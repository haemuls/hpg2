'use client'; // 최상단에 추가하여 클라이언트 컴포넌트로 설정

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../../token';
import styles from './login1.module.css';

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

  return (
    <div className={styles.login}>
      <div className={styles.loginContent}>
        <div className={styles.loginForms}>
          <form onSubmit={handleSubmit} className={styles.loginRegister} id="login-in">
            <h1 className={styles.loginTitle}>로그인</h1>

            {errorMessage && <p className={styles.loginError}>{errorMessage}</p>}

            <div className={styles.loginBox}>
              <i className={`bx bx-user ${styles.loginIcon}`}></i>
              <input
                type="text"
                placeholder="아이디"
                className={styles.loginInput}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={styles.loginBox}>
              <i className={`bx bx-lock ${styles.loginIcon}`}></i>
              <input
                type="password"
                placeholder="비밀번호"
                className={styles.loginInput}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <a href="#" className={styles.loginForgot}>비밀번호 찾기</a>

            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>

            <Link href="/signup" className={`${styles.loginSignin} ${styles.loginSigninSignup}`}>
              회원가입
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;