'use client';

import React, { useState, useEffect, useCallback } from 'react';
import HeadContent from './HeadContent';
import BodyContent from './BodyContent';

import { getToken, clearTokens } from '../../token';
import { fetchActiveUsers, fetchProblemTitles, ActiveUserData } from '../lib/apiClient';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);
  const [activeUsersProblems, setActiveUsersProblems] = useState<Record<number, string[]>>({});
  const [problemTitles, setProblemTitles] = useState<Record<number, string>>({});
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const fetchUserProblemsTitles = useCallback(
    async (token: string, activeUsersData: ActiveUserData[]) => {
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

        const membershipId = localStorage.getItem('membershipId');
        if (!membershipId) throw new Error('Membership ID not found');

        const titles = await fetchProblemTitles(token, problemIds, membershipId);

        setProblemTitles(titles);
        setActiveUsersProblems(activeUsersProblems);
      } catch (error) {
        console.error('Error fetching user problems titles:', error);
      }
    },
    []
  );

  const fetchActiveUsersAndProblems = useCallback(
    async (token: string) => {
      try {
        const activeUsersData = await fetchActiveUsers(token);
        setActiveUserCount(activeUsersData.length);
        fetchUserProblemsTitles(token, activeUsersData);
      } catch {
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
        fetchActiveUsersAndProblems(jwtToken);
      }
    };

    checkTokenValidity();
  }, [fetchActiveUsersAndProblems]);

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
      <BodyContent
        nickname={nickname}
        activeUserCount={activeUserCount}
        activeUsersProblems={activeUsersProblems}
        problemTitles={problemTitles}
        showModal={showModal}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
        onCloseModal={() => setShowModal(false)}
      >
        {children}
      </BodyContent>
    </html>
  );
};

export default RootLayout;
