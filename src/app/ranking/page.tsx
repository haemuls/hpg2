'use client';

import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../token";
import styles from "./ranking.module.css"; // CSS 모듈

const API_BASE_URL = "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/users/sorted-by-score";

interface User {
  rank: number;
  nickname: string;
  solvedCount: number;
  lastActived: string;
}

const RankingPage = () => {
  const [ranking, setRanking] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getAccessToken();
    setToken(storedToken);
  }, []);

  useEffect(() => {
    // 초기 상태 처리: token이 null일 때는 작업하지 않음
    if (token === null) {
      return;
    }

    if (!token) {
      alert("토큰이 존재하지 않습니다. 로그인 후 다시 시도해주세요.");
      return;
    }

    const fetchRankingData = async () => {
      try {
        const res = await fetch(API_BASE_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
          },
        });

        if (!res.ok) {
          throw new Error(`랭킹 API 호출 실패: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setRanking(data.result.content);
      } catch (error) {
        console.error("랭킹 조회 실패:", error);
      }
    };

    fetchRankingData();
  }, [token]);

  return (
    <div className={styles.ranking}>
      <div className={styles.rankingTitle}>
        <h3>랭킹</h3>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thNum}>순위</th>
              <th className={styles.thTitle}>닉네임</th>
              <th className={styles.thNum}>점수</th>
              <th className={styles.thDate}>마지막 로그인</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((user, index) => (
              <tr key={index} className={styles.row}>
                <td className={styles.cell}>{user.rank}</td>
                <td className={styles.cell}>{user.nickname}</td>
                <td className={styles.cell}>{user.solvedCount}</td>
                <td className={styles.cell}>{new Date(user.lastActived).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingPage;
