'use client';

import React, { useState } from 'react';
import { login } from '../../../token'; // token.ts에서 login 함수 import
import styles from './login1.module.css';

const SignUpPage = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // 회원가입 여부 상태

  const toggleForm = (type: 'signin' | 'signup') => {
    setIsSignUp(type === 'signup');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      if (isSignUp) {
        // 회원가입 처리
        const response = await fetch('https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            account: id,
            nickname: nickname,
            password: password,
          }),
        });

        if (response.ok) {
          alert('회원가입 성공!');
        } else {
          const errorMessage = await response.text();
          alert(`회원가입 실패: ${errorMessage}`);
        }
      } else {
        // 로그인 처리
        const response = await login(id, password); // token.ts의 login 함수 사용

        if (response) {
          // 로그인 성공 시 메인 페이지로 리다이렉트
          window.location.href = '/'; // 메인 페이지로 이동
        } else {
          alert('로그인 실패. 다시 시도해 주세요.');
        }
      }
    } catch (error) {
      console.error('Error during submission:', error);
      alert('요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      {/* Heading */}
      <h1 className={styles.heading}>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h1>

      {/* Links */}
      <ul className={styles.links}>
        <li>
          <a href="#" onClick={() => toggleForm('signin')} id="signin">로그인</a>
        </li>
        <li>
          <a href="#" onClick={() => toggleForm('signup')} id="signup">회원가입</a>
        </li>
      </ul>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className={styles.input__block}>
          <input
            type="text"
            placeholder="ID"
            className={`${styles.input} first-input`}
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        {isSignUp && (
          <div className={styles.input__block}>
            <input
              type="text"
              placeholder="Nickname"
              className={`${styles.input} first-input`}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
        )}
        <div className={styles.input__block}>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isSignUp && (
          <div className={styles.input__block} id="repeat__password">
            <input
              type="password"
              placeholder="Repeat password"
              className={styles.input}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button className={styles.signin__btn} type="submit">
          {isSignUp ? 'Sign up' : 'Sign in'}
        </button>
      </form>

      {/* Separator */}
      <div className={styles.separator}>
        <p>OR</p>
      </div>

      {/* OAuth Buttons */}
      <button className={styles.google__btn}>
        Google로 로그인
      </button>
      <button className={styles.github__btn}>
        Github로 로그인
      </button>
    </div>
  );
};

export default SignUpPage;
