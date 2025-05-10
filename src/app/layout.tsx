'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { getToken, clearTokens } from '../../token';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig() || {};
const GA_MEASUREMENT_ID = publicRuntimeConfig?.GA_MEASUREMENT_ID || '';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);
  const [activeUsersProblems, setActiveUsersProblems] = useState<Record<number, string[]>>({});
  const [problemTitles, setProblemTitles] = useState<Record<number, string>>({});
  const [isClient, setIsClient] = useState(false);

  const fetchUserProblemsTitles = useCallback(
    async (token: string, activeUsersData: { userId: string; problemId: string }[]) => {
      try {
        const activeUsersProblems: Record<number, string[]> = {};
        const problemIds: number[] = [];

        activeUsersData.forEach(({ userId, problemId }) => {
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
        <title>Hack Playground - CTF 사이트</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="keywords" content="CTF, 해킹, 보안, 문제 풀이" />
        <meta name="description" content="CTF 사이트 테스트용 페이지" />
        <link rel="icon" href="/images/test_sione.jpeg" type="image/gif" />
        <link rel="stylesheet" href="/styles/bootstrap.css" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:400,600,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/font-awesome.min.css" />
        <link rel="stylesheet" href="/styles/style.css" />
        <link rel="stylesheet" href="/styles/responsive.css" />
        <link rel="stylesheet" href="/styles/navbar-hover.css" />

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                      page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
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

                <div className="quote_btn-container d-flex align-items-center">
                  {nickname ? (
                    <>
                      <Dropdown className="mr-3">
                        <Dropdown.Toggle id="dropdown-active-users"
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#000',
                          fontSize: '16px',
                          padding: '0 10px',
                        }}>
                          {activeUserCount !== null
                            ? `현재 접속인원 :${activeUserCount}명`
                            : '접속 중 사용자 수'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu style = {{ background: 'transparent'}}>
                          {Object.keys(activeUsersProblems).map((problemId) => {
                            const problemIdNumber = Number(problemId);
                            const problemTitle = problemTitles[problemIdNumber];

                            if (activeUsersProblems[problemId].length > 0) {
                              return (
                                <Dropdown.Item key={problemId}>
                                  {problemTitle
                                    ? problemTitle
                                    : `문제 ID ${problemId}`} :{' '}
                                  {activeUsersProblems[problemId].length}명
                                </Dropdown.Item>
                              );
                            }
                            return null;
                          })}
                        </Dropdown.Menu>
                      </Dropdown>

                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {nickname}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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

        {children}
      </body>
    </html>
  );
};

export default RootLayout;
