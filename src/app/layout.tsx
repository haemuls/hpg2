'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { getToken, clearTokens } from '../../token';
import HeadContent from './HeadContent';
import Modal from './components/Modal';
import ActiveUsersDropdown from './ActiveUsersDropdown';
import UserDropdown from './UserDropdown';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);
  const [activeUsersProblems, setActiveUsersProblems] = useState<Record<number, string[]>>({});
  const [problemTitles, setProblemTitles] = useState<Record<number, string>>({});
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  /* modal 코드 */
  const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowModal(true);
  };


  const fetchUserProblemsTitles = useCallback(
      async (token: string, activeUsersData: { userId: string; problemId: string }[]) => {
        try {
          const activeUsersProblems: Record<number, string[]> = {};
          const problemIds: number[] = [];

          activeUsersData.forEach(({userId, problemId}) => {
            const problemIdNum = parseInt(problemId, 10);

            if (!activeUsersProblems[problemIdNum]) {
              activeUsersProblems[problemIdNum] = [];
            }

            activeUsersProblems[problemIdNum].push(userId);
            if (!problemIds.includes(problemIdNum)) {
              problemIds.push(problemIdNum);
            }
          });

          const titles = await fetchProblemTitles(token, problemIds);

          setProblemTitles(titles);
          setActiveUsersProblems(activeUsersProblems);
        } catch (error) {
          console.error('Error fetching user problems titles:', error);
        }
      },
      []
  );

  const fetchProblemTitles = async (token: string, problemIds: number[]): Promise<Record<number, string>> => {
    const titles: Record<number, string> = {};

    try {
      const membershipId = localStorage.getItem('membershipId');
      if (!membershipId) {
        throw new Error('Membership ID not found');
      }

      const response = await fetch(
          `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/problems/completed?userId=${membershipId}&type=WARGAME&kind=&sortKind=&desc=true&page=0&size=25`,
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
        data.content.forEach((item: { id: number; title: string }) => {
          if (problemIds.includes(item.id)) {
            titles[item.id] = item.title;
          }
        });
      } else {
        console.error('Failed to fetch problem titles:', response.status);
      }
    } catch (error) {
      console.error('Error fetching problem titles:', error);
    }

    return titles;
  };

  const fetchActiveUsers = useCallback(
      async (token: string) => {
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
            setActiveUserCount(data.length);
            fetchUserProblemsTitles(token, data);
          } else {
            console.error('Failed to fetch active users:', response.status);
            setActiveUserCount(null);
          }
        } catch (error) {
          console.error('Error fetching active users:', error);
          setActiveUserCount(null);
        }
      },
      [fetchUserProblemsTitles]
  );

  useEffect(() => {
    setIsClient(true);

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
  }, [fetchActiveUsers]);

  const handleLogout = () => {
    clearTokens();
    setNickname(null);
    setActiveUserCount(null);
  };

  if (!isClient) {
    return <></>;
  }

  return (
    <html lang="ko">
      <head>
        <HeadContent />
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
                            onProfileClick={handleProfileClick}
                            onLogout={handleLogout}
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

        {showModal && <Modal isOpen={showModal} onClose={() => setShowModal(false)}/>}

        <footer>
          <div className="container-fluid text-center">
            <p>Hacker Playground</p>
          </div>
        </footer>

        <Script src="/js/jquery-3.4.1.min.js" strategy="beforeInteractive"/>
        <Script src="/js/bootstrap.js" strategy="beforeInteractive"/>
        <Script src="/js/navbar-hover.js" strategy="beforeInteractive" />
        <Script src="/js/custom.js" strategy="lazyOnload" />
      </body>
    </html>
  );
};

export default RootLayout;