'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { getToken, clearTokens } from '../../token';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
      setNickname(storedNickname);
    }

    const checkTokenValidity = async () => {
      const jwtToken = await getToken();
      if (!jwtToken) {
        clearTokens();
        setNickname(null);
        setActiveUserCount(null);
      } else {
        fetchActiveUsers(jwtToken);
      }
    };

    checkTokenValidity();
  }, []);

  const fetchActiveUsers = async (token: string) => {
    try {
      const response = await fetch(
        'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/pods/active?namespace=wargame',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setActiveUserCount(Object.keys(data).length); // 사용자-문제 매핑 개수를 카운트
      } else {
        console.error('Failed to fetch active users:', response.status);
        setActiveUserCount(null);
      }
    } catch (error) {
      console.error('Error fetching active users:', error);
      setActiveUserCount(null);
    }
  };

  const handleLogout = () => {
    clearTokens();
    setNickname(null);
    setActiveUserCount(null);
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
                        {activeUserCount !== null && (
                          <span style={{ marginLeft: '10px', fontSize: '0.9em', color: '#fff' }}>
                            ({activeUserCount}명 접속 중)
                          </span>
                        )}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
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
          <p>&copy; 2025 hpground.xyz</p>
        </footer>

        {/* 비동기 로드 스크립트 */}
        <Script src="/js/jquery-3.4.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.js" strategy="beforeInteractive" />
        <Script src="/js/navbar-hover.js" strategy="beforeInteractive" />
        <Script src="/js/custom.js" strategy="lazyOnload" />
      </body>
    </html>
  );
};

export default RootLayout;
