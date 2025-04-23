'use client';  // 이 줄을 추가합니다.

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "../../../public/styles/signup.css";

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const response = await fetch('https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        account: username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const { accessToken, refreshToken } = data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('회원가입 성공');
      alert('회원가입이 완료되었습니다!');

      router.push('/login');
    } else {
      console.error('회원가입 실패');
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__forms">
          <form onSubmit={handleSubmit} className="login__create" id="login-up">
            <h1 className="login__title">회원가입</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="아이디"
                name="username"
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
                name="password"
                className="login__input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login__box">
              <i className="bx bx-lock login__icon"></i>
              <input
                type="password"
                placeholder="비밀번호 재입력"
                name="confirm_password"
                className="login__input"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="닉네임"
                name="nickname"
                className="login__input"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <button type="submit" className="login__button">회원가입</button>

            <div>
              <span className="login__account">계정이 이미 있다면?</span>
              <Link href="/login" className="login__signin">로그인</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;