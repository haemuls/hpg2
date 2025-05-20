'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

type ProblemStats = {
  newProblemsCount: number;
  solvedProblemsCount: number;
};

const fetchProblemStats = async (): Promise<ProblemStats> => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com';
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
    fetchProblemStats()
      .then((stats) => {
        setSolvedProblems(stats.solvedProblemsCount);
        setNewProblems(stats.newProblemsCount);
      })
      .catch((error) => console.error('초기화 오류:', error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.imgBox}>
                <img src="/images/hpg.png" alt="CTF 사이트 테스트용 이미지" />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.detailBox}>
                <h3 className={styles.smallText}>
                  CTF 문제를 풀고, 직접 출제할 수 있는 정보보안 교육 생태계 형성을 목표로 하고 있습니다.
                  <br />

                </h3>
                <div className={styles.statsBoxes}>
                  <div className={styles.statsBox}>
                    <h6>전체 문제</h6>
                    <p>{isLoading ? '로딩 중...' : solvedProblems}</p>
                  </div>
                  <div className={styles.statsBox}>
                    <h6>최근 한달간 출제된 문제</h6>
                    <p>{isLoading ? '로딩 중...' : newProblems}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.notionsSection}>
        <iframe
          src="https://lake-middle-d9f.notion.site/ebd/1db0ebc77a6b80fba6faff7068412a7c"
          allowFullScreen
          scrolling="no"
          style = {{
            maxHeight: "100%",
            height: "3800px",
            border: "none",
            overflow: "hidden",
          }}
        />
      </section>
    </div>
  );
};

export default HomePage;
