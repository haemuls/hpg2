'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

type ProblemStats = {
  newProblemsCount: number;
  solvedProblemsCount: number;
};

const fetchProblemStats = async (): Promise<ProblemStats> => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com';
    const res = await fetch(`${BASE_URL}/api/problems/statistics`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }

    const data = await res.json();
    const { newCount, checkedCount } = data.result || { newCount: 0, checkedCount: 0 };
    return { newProblemsCount: newCount, solvedProblemsCount: checkedCount };
  } catch (error) {
    console.error('Fetch error:', error);
    return { newProblemsCount: 0, solvedProblemsCount: 0 };
  }
};

const HomePage = () => {
  const [solvedProblems, setSolvedProblems] = useState<number>(0);
  const [newProblems, setNewProblems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const stats = await fetchProblemStats();
        setSolvedProblems(stats.solvedProblemsCount);
        setNewProblems(stats.newProblemsCount);
      } catch (error) {
        console.error('초기화 오류:', error);
        setSolvedProblems(0);
        setNewProblems(0);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.imgBox}>
              <img src="/images/logo.png" alt="CTF 사이트 테스트용 이미지" />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.detailBox}>
              <h3 className={styles.smallText}>
                워게임 문제 서비스 HPlayground는 보안 관련 교육 및 커뮤니티 형성을 목표로 하고 있습니다.
                <br />
                부산권부터 점차 확산되어, 현재 전국 2개 정보 보안 동아리가 문제 제작, 풀이에 참여하고 있습니다.
              </h3>
              <div className={styles.statsBoxes}>
                <div className={styles.statsBox}>
                  <h4>문제 개수</h4>
                  <p>{isLoading ? '로딩 중...' : solvedProblems}</p>
                </div>
                <div className={styles.statsBox}>
                  <h4>최근 출제된 문제</h4>
                  <p>{isLoading ? '로딩 중...' : newProblems}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
