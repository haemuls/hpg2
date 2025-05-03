'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { clearTokens, getValidAccessToken } from '../../token';
import axios from 'axios';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [activeUsers, setActiveUsers] = useState<number>(0);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      const storedNickname = localStorage.getItem('nickname');

      // 로컬 스토리지에서 토큰과 닉네임을 읽어오고 상태를 설정합니다.
      if (jwtToken && storedNickname) {
        setNickname(storedNickname);
      } else {
        setNickname(null);
      }
    };

    // 첫 렌더링 시 로그인 상태 체크
    checkLoginStatus();

    // storage 이벤트 리스너 등록 (로컬 스토리지 변경 시 상태 업데이트)
    const handleStorageChange = () => {
      checkLoginStatus(); // 로컬 스토리지 변경 시 상태 업데이트
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // 빈 배열을 사용하여 한 번만 실행되도록 설정

  useEffect(() => {
    if (nickname) {
      const fetchActiveUsers = async () => {
        try {
          const response = await axios.get(
            'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/pods/active',
            {
              params: { namespace: 'wargame' },
              headers: { Accept: '*/*' },
            }
          );

          // 응답 구조를 확인 후 적절히 처리
          const activeUsersData = response.data;  // 예시로 response.data를 그대로 활용

          if (Array.isArray(activeUsersData)) {
            setActiveUsers(activeUsersData.length); // 배열인 경우 길이를 사용
          } else if (activeUsersData && typeof activeUsersData === 'object') {
            setActiveUsers(Object.keys(activeUsersData).length); // 객체인 경우 키의 길이를 사용
          } else {
            setActiveUsers(0); // 그 외의 경우 0명으로 설정
          }

        } catch (error) {
          console.error('Failed to fetch active users:', error);
        }
      };

      fetchActiveUsers();
    }
  }, [nickname]); // nickname이 변경될 때마다 실행

  const handleLogout = () => {
    clearTokens();
    localStorage.removeItem('jwtToken'); // JWT 토큰 삭제
    localStorage.removeItem('nickname'); // 닉네임 삭제
    setNickname(null); // 상태 초기화
  };

  return (
    <html lang="ko">
      <head>
        <title>Hack Playground - CTF 사이트</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="keywords" content="CTF, 해킹, 보안, 문제 풀이" />
        <meta name="description" content="CTF 사이트 테스트용 페이지" />
        <link rel="icon" href="/images/test_sione.jpeg" type="image/gif" />
        <link rel="stylesheet" href="/styles/bootstrap.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:400,600,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles/font-awesome.min.css" />
        <link rel="stylesheet" href="/styles/style.css" />
        <link rel="stylesheet" href="/styles/responsive.css" />
        <link rel="stylesheet" href="/styles/navbar-hover.css" />
      </head>
      <body className="sub_page">
        <div className="hero_area">
          <header className="header_section long_section px-0">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <Link className="navbar-brand" href="/">
                <span>Hack Playground</span>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
              >
                <span> </span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav d-flex mx-auto flex-column flex-lg-row align-items-center">
                  <li className="nav-item">
                    <Link className="nav-link" href="/">
                      HOME
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/notice">
                      Notice
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/game">
                      GAME
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/ranking">
                      Ranking
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/board">
                      자유 게시판
                    </Link>
                  </li>
                </ul>
                <div className="quote_btn-container">
                  {nickname ? (
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {nickname}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <strong>접속 중:</strong> {activeUsers}명
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Link href="/login">
                      <span>Login</span>
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </header>
        </div>

        <main>{children}</main>

        <footer className="footer_section">
          <p>&copy; 2025 wargame 사이트 테스트</p>
        </footer>

        <Script src="/js/jquery-3.4.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.js" strategy="beforeInteractive" />
        <Script src="/js/navbar-hover.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
};

export default RootLayout;
