"use client";

import React, { useState, useEffect } from "react";
import { login, parseAndStoreTokenFromURL } from "../../../token"; // token.ts에서 함수 import
import styles from "./login1.module.css";

const SignUpPage = () => {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = (type: "signin" | "signup") => {
    setIsSignUp(type === "signup");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      if (isSignUp) {
        // 회원가입 처리
        const response = await fetch(
          "https://api.hpground.xyz/api/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              account: id,
              nickname: nickname,
              password: password,
            }),
          }
        );

        if (response.ok) {
          alert("회원가입 성공!");
          setIsSignUp(false); // 로그인 페이지로 전환
        } else {
          const errorMessage = await response.text();
          alert(`회원가입 실패: ${errorMessage}`);
        }
      } else {
        // 일반 로그인 처리
        const response = await login(id, password); // token.ts의 login 함수 사용

        if (response) {
          window.location.href = "/"; // 메인 페이지로 이동
        } else {
          alert("로그인 실패. 다시 시도해 주세요.");
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    toggleForm("signin");

    async function handleSocialLogin() {
      // URL에 token 파라미터가 있으면 서버에 보내 로그인 처리 및 토큰 저장
      const success = await parseAndStoreTokenFromURL();
      if (success) {
        window.location.href = "/";
      }
    }

    handleSocialLogin();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{isSignUp ? "회원가입" : "로그인"}</h1>

      <ul className={styles.links}>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleForm("signin");
            }}
          >
            로그인
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleForm("signup");
            }}
          >
            회원가입
          </a>
        </li>
      </ul>

      <form onSubmit={handleSubmit}>
        <div className={styles.input__block}>
          <input
            type="text"
            placeholder="ID"
            className={`${styles.input} first-input`}
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            autoComplete="username"
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
            autoComplete={isSignUp ? "new-password" : "current-password"}
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
              autoComplete="new-password"
            />
          </div>
        )}
        <button className={styles.signin__btn} type="submit">
          {isSignUp ? "회원가입" : "로그인"}
        </button>
      </form>

      <div className={styles.separator}>
        <p>OR</p>
      </div>

      <button
        className={styles.google__btn}
      >
        기능 구현중...
      </button>
      <button
        className={styles.github__btn}
      >
        기능 구현중...
      </button>
    </div>
  );
};

export default SignUpPage;
