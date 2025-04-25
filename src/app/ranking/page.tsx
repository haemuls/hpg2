'use client';

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchAllRankingData = async () => {
      let allUsers: User[] = [];
      let currentPage = 0;
      const pageSize = 25;
      const types = "WARGAME";

      while (true) {
        try {
          const res = await fetch(`${API_BASE_URL}?type=${types}&page=${currentPage}&size=${pageSize}`, {
            method: 'GET',
            headers: {
              'Accept': '*/*',
            },
          });

          if (!res.ok) {
            throw new Error(`랭킹 API 호출 실패: ${res.status} ${res.statusText}`);
          }

          const data = await res.json();
          allUsers = [...allUsers, ...data.result.content];

          // 마지막 페이지 확인
          const totalPages = data.result.totalPages;
          if (currentPage + 1 >= totalPages) {
            break;
          }

          currentPage += 1; // 다음 페이지로 이동
        } catch (error) {
          console.error("랭킹 조회 실패:", error);
          break;
        }
      }

      setRanking(allUsers); // 모든 데이터를 상태에 저장
    };

    fetchAllRankingData();
  }, []);

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
