// BodyContent.tsx 수정본

'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import ActiveUsersDropdown from './ActiveUsersDropdown';
import UserDropdown from './UserDropdown';
import Modal from './components/Modal';

interface BodyContentProps {
  nickname: string | null;
  activeUserCount: number | null;
  activeUsersProblems: Record<number, string[]>;
  problemTitles: Record<number, string>;
  showModal: boolean;
  onProfileClick: (e: React.MouseEvent<HTMLElement>) => void;
  onLogout: () => void;
  onCloseModal: () => void;
  children: React.ReactNode;
}

const BodyContent: React.FC<BodyContentProps> = ({
  nickname,
  activeUserCount,
  activeUsersProblems,
  problemTitles,
  showModal,
  onProfileClick,
  onLogout,
  onCloseModal,
  children,
}) => (
  <div className="sub_page"> {/* 여기서 <body>를 <div>로 변경 */}
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
                  Community
                </Link>
              </li>
            </ul>

            <div className="quote_btn-container d-flex align-items-center">
              {nickname ? (
                <>
                  <ActiveUsersDropdown
                    activeUserCount={activeUserCount}
                    activeUsersProblems={activeUsersProblems}
                    problemTitles={problemTitles}
                  />
                  <UserDropdown
                    nickname={nickname}
                    onProfileClick={onProfileClick}
                    onLogout={onLogout}
                  />
                </>
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

    {showModal && <Modal isOpen={showModal} onClose={onCloseModal} />}

    <footer>
      <div className="container-fluid text-center">
        <p>Hacker Playground</p>
      </div>
    </footer>

    <Script src="/js/jquery-3.4.1.min.js" strategy="beforeInteractive" />
    <Script src="/js/bootstrap.js" strategy="beforeInteractive" />
    <Script src="/js/navbar-hover.js" strategy="beforeInteractive" />
    <Script src="/js/custom.js" strategy="lazyOnload" />
  </div>
);

export default BodyContent;
