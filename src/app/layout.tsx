'use client';

import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
      setNickname(savedNickname);
    }

    const updateNickname = (event: CustomEvent) => {
      setNickname(event.detail); // 이벤트로 전달된 닉네임 설정
    };

    window.addEventListener('nicknameUpdated', updateNickname as EventListener);

    return () => {
      window.removeEventListener('nicknameUpdated', updateNickname as EventListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setNickname(null);
  };

  return (
    <html lang="ko">
      <head>
        <title>Hack Playground - CTF 사이트</title>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="keywords" content="CTF, 해킹, 보안, 문제 풀이"/>
        <meta name="description" content="CTF 사이트 테스트용 페이지"/>
        <link rel="icon" href="/images/test_sione.jpeg" type="image/gif"/>
        <link rel="stylesheet" href="/styles/bootstrap.css"/>
        <link href="https://fonts.googleapis.com/css?family=Poppins:400,600,700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="/styles/font-awesome.min.css"/>
        <link rel="stylesheet" href="/styles/style.css"/>
        <link rel="stylesheet" href="/styles/responsive.css"/>
        <link rel="stylesheet" href="/styles/navbar-hover.css"/>
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
                  <Link className="nav-link" href="/">HOME</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/notice">Notice</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/game">GAME</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/ranking">Ranking</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/board">자유 게시판</Link>
                </li>
              </ul>
              <div className="quote_btn-container">
                {nickname ? (
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {nickname}
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
        <p>&copy; 2025 wargame 사이트 테스트</p>
      </footer>

      <script src="/js/navbar-hover.js" defer></script>
      <script src="/js/jquery-3.4.1.min.js"></script>
      <script src="/js/bootstrap.js"></script>
      <script src="/js/custom.js"></script>
      </body>
    </html>
  );
};

export default RootLayout;