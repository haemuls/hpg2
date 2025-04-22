'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./game.module.css";
import { getValidAccessToken, clearTokens } from "../../../token";

const API_URL = "http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/problems/completed";

interface Post {
  id: number;
  solved: boolean;
  title: string;
  level: string | null;
  correctRate: number | null;
  creator: string;
  type: string | null;
  lastModified: string;
}

const ClientDate = ({ date }: { date: string }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleDateString());
  }, [date]);

  return <>{formattedDate}</>;
};

const GamePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("전체");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size] = useState(10);
  const router = useRouter();

  const membershipId = typeof window !== "undefined" ? localStorage.getItem("membershipId") || "99999" : "99999";
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getValidAccessToken();
      if (!token) {
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        clearTokens();
      } else {
        setAccessToken(token);  // 토큰을 상태에 저장
      }
    };
    loadToken();
  }, []); // 빈 배열로 한 번만 실행

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams({
          userId: membershipId,
          type: "WARGAME",
          desc: "true",
          page: currentPage.toString(),
          size: size.toString(),
        });

        if (selectedType !== "전체") {
          params.append("kind", selectedType);
        }

        const url = `${API_URL}?${params.toString()}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("권한이 없습니다. 다시 로그인 해주세요.");
          }
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }

        const data = await response.json();

        setTotalPages(data.totalPages);

        const formattedPosts = data.content.map((post: Post) => ({
          id: post.id,
          solved: post.solved,
          title: post.title,
          level: post.level,
          correctRate: post.correctRate,
          creator: post.creator,
          type: post.type,
          lastModified: post.lastModified,
        }));

        setPosts(formattedPosts);
      } catch (error) {
        setError(error instanceof Error ? error.message : "게시글 로딩 오류");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchPosts();
    }
  }, [accessToken, membershipId, currentPage, selectedType, size]); // 의존성 배열에 accessToken 추가

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("검색어:", searchTerm);
  };

  const handleCreateButtonClick = () => {
    router.push("/game/game_create");
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredPosts = posts.filter((post) => post.title.includes(searchTerm));

  const getLevelIcon = (level: string | null) => {
    if (!level) {
      return "❓"; // 레벨이 없으면 물음표 이모티콘
    }

    const levelNumber = parseInt(level, 10);
    if (levelNumber === 1) {
      return "⭐"; // 레벨 1은 별 한 개
    } else if (levelNumber === 2) {
      return "⭐⭐"; // 레벨 2는 별 두 개
    } else if (levelNumber === 3) {
      return "⭐⭐⭐"; // 레벨 3은 별 세 개
    }

    return "❓"; // 그 외의 경우는 물음표 이모티콘
  };

  return (
    <section className={styles.game}>
      <div className={styles.pageTitle}>
        <div className={styles.container}>
          <h3>문제</h3>
        </div>
      </div>

      <div className={styles.pagination}>
        {totalPages > 0 &&
          Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index}
              className={`${styles.pageNumber} ${index === currentPage ? styles.active : ""}`}
              onClick={() => goToPage(index)}
            >
              {index + 1}
            </span>
          ))}
      </div>

      <div className={styles.problemTypeSelector}>
        <div className={styles.container}>
          <label htmlFor="problemType" className={styles.blind}>
            문제 종류 :
          </label>
          <select
            id="problemType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={styles.problemSelector}
          >
            <option value="전체">전체</option>
            <option value="webhacking">webhacking</option>
            <option value="pwnable">pwnable</option>
            <option value="reversing">reversing</option>
            <option value="crypto">crypto</option>
          </select>
        </div>
      </div>

      <div id={styles.boardList}>
        <div className={styles.container}>
          {loading ? (
            <p className={styles.loadingMessage}>문제를 불러오는 중입니다...</p>
          ) : (
            <table className={styles.boardTable}>
              <thead>
                <tr>
                  <th scope="col" className={styles.thNum}></th>
                  <th scope="col" className={styles.thNum}>문제 번호</th>
                  <th scope="col" className={styles.thDifficulty}>난이도</th>
                  <th scope="col" className={styles.thTitle}>문제 제목</th>
                  <th scope="col" className={styles.thAccuracy}>정답율</th>
                  <th scope="col" className={styles.thDate}>마지막 수정일</th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan={6} className={styles.errorMessage}>
                      {error}
                    </td>
                  </tr>
                ) : filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.solved ? "✅" : ""}</td>
                      <td>{post.id}</td>
                      <td>{getLevelIcon(post.level)}</td>
                      <td>
                        <Link href={`/game/${post.id}`}>{post.title}</Link>
                      </td>
                      <td>{post.correctRate !== null ? `${post.correctRate}%` : "-"}</td>
                      <td>
                        <ClientDate date={post.lastModified} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>문제가 없습니다. ㅠㅠ</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className={styles.boardSearch}>
        <div className={styles.container}>
          <div className={styles.searchWindow}>
            <form onSubmit={handleSearch}>
              <div className={styles.searchWrap}>
                <label htmlFor="search" className={styles.blind}></label>
                <input
                  id="search"
                  type="search"
                  placeholder="검색어를 입력해주세요."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  검색
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.writeButtonWrap}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles.btnDark}
            onClick={handleCreateButtonClick}
          >
            문제 출제
          </button>
        </div>
      </div>
    </section>
  );
};

export default GamePage;
