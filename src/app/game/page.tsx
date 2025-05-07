'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./game.module.css";

const API_URL = "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/problems/completed"; // 기본 API URL

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
  const [size] = useState(25);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sortKind, setSortKind] = useState("");
  const [desc, setDesc] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
  const router = useRouter();

  const membershipId = typeof window !== "undefined" ? localStorage.getItem("membershipId") || "99999" : "99999";

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true); // 로그인 상태일 경우 true
    }
  }, []);

  const handleSort = (column: string) => {
    if (column === "correctRate" || column === "lastModified") {
      setSortKind(column);
      setDesc(prevDesc => (prevDesc && column === sortKind) ? !prevDesc : true);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          userId: membershipId,
          type: "WARGAME",
          kind: selectedType === "전체" ? "" : selectedType,
          sortKind: sortKind,
          desc: desc.toString(),
          page: currentPage.toString(),
          size: size.toString(),
        });

        const url = `${API_URL}?${params.toString()}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("권한이 없습니다.");
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

    fetchPosts();
  }, [membershipId, currentPage, selectedType, size, sortKind, desc]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 로딩 상태 시작
    setError(""); // 기존 에러 메시지 초기화

    try {
      const params = new URLSearchParams({
        problemType: "WARGAME", // 타입은 WARGAME으로 고정
        WargameKind: selectedType === "전체" ? "" : selectedType, // 선택된 타입을 기준으로 설정
        keyword: searchTerm, // 검색어로 전달
        page: currentPage.toString(),
        size: size.toString(),
      });

      const url = `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/problems/search?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "*/*", // 헤더에서 accept 설정
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`, // JWT 토큰을 헤더에 추가
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("권한이 없습니다.");
        }
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      const data = await response.json();
      setTotalPages(data.totalPages); // 전체 페이지 수 설정

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

      setPosts(formattedPosts); // 검색된 문제 목록을 업데이트
    } catch (error) {
      setError(error instanceof Error ? error.message : "검색 오류");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  const handleCreateButtonClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 문제를 제출할 수 있습니다.");
      return;
    }
    router.push("/game/game_create");
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const getLevelIcon = (level: string | null) => {
    if (!level) {
      return "❓";
    }

    const levelNumber = parseInt(level, 10);
    if (levelNumber === 1) {
      return "⭐";
    } else if (levelNumber === 2) {
      return "⭐⭐";
    } else if (levelNumber === 3) {
      return "⭐⭐⭐";
    }

    return "❓";
  };

  return (
    <section className={styles.game}>
      <div className={styles.pageTitle}>
        <div className={styles.container}>
          <h3>문제</h3>
        </div>
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
            <option value="WEBHACKING">webhacking</option>
            <option value="SYSTEM">pwnable</option>
            <option value="REVERSING">reversing</option>
            <option value="CRYPTO">crypto</option>
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
                  <th scope="col" className={styles.thNum}>
                    문제 번호
                  </th>
                  <th scope="col" className={styles.thDifficulty}>
                    난이도
                  </th>
                  <th scope="col" className={styles.thTitle}>
                    문제 제목
                  </th>
                  <th
                    scope="col"
                    className={styles.thAccuracy}
                    onClick={() => handleSort("correctRate")}
                    style={{ cursor: "pointer" }}
                  >
                    정답율
                  </th>
                  <th
                    scope="col"
                    className={styles.thDate}
                    onClick={() => handleSort("lastModified")}
                    style={{ cursor: "pointer" }}
                  >
                    마지막 수정일
                  </th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan={6} className={styles.errorMessage}>
                      {error}
                    </td>
                  </tr>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.solved ? "✅" : ""}</td>
                      <td>{post.id}</td>
                      <td>{getLevelIcon(post.level)}</td>
                      <td>
                        <Link href={`/game/${post.id}`}>{post.title}</Link>
                      </td>
                      <td>{post.correctRate !== null ? `${post.correctRate.toFixed(0)}%` : "-"}</td>
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
            className={styles.writeButton}
            onClick={handleCreateButtonClick}
            disabled={!isLoggedIn} // 로그인 안된 경우 버튼 비활성화
          >
            문제 만들기
          </button>
        </div>
      </div>
    </section>
  );
};

export default GamePage;
