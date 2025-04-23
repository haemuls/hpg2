'use client';

import React, { useState, useEffect } from "react";
import styles from "./board.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAccessToken } from "../../../token";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";

interface Post {
  id: number;
  title: string;
  creator: string;
  lastModified: string;
  formattedDate: string;
}

interface ApiResponse {
  result: {
    content: Post[];
    totalPages: number;
  };
}

const BoardPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [sortByDateNewest, setSortByDateNewest] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const fetchPosts = async (): Promise<void> => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/boards?type=ANNOUNCE&page=${currentPage}&size=25&sortByNewest=${sortByDateNewest}&search=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("공지사항을 불러오는 데 실패했습니다.");
      }

      const data: ApiResponse = await response.json();
      const formattedPosts = data.result.content.map((post) => ({
        ...post,
        id: Number(post.id),
        formattedDate: new Date(post.lastModified).toLocaleDateString(),
      }));

      setPosts(formattedPosts);
      setTotalPages(data.result.totalPages);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : "공지사항을 불러오는 중 오류가 발생했습니다."));
    } finally {
      setLoading(false);
    }
  };

  const checkLoginStatus = (): void => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);

    if (token) {
      const nickName = localStorage.getItem("nickName") || "";
      setIsAdmin(nickName === "관리자");
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCurrentPage(0);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
    checkLoginStatus();
  }, [sortByDateNewest, currentPage, searchTerm]);

  const toggleSortByDate = (): void => {
    setSortByDateNewest((prev) => !prev);
    setCurrentPage(0);
  };

  const goToPage = (page: number): void => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleWritePost = async (): Promise<void> => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    const token = getAccessToken();

    try {
      const response = await fetch(`${API_BASE_URL}/token-validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jwtToken: token,
        }),
      });

      const data: boolean = await response.json();

      if (response.ok && data) {
        router.push("/board/write");
      } else {
        alert("토큰이 유효하지 않습니다.");
      }
    } catch (err: unknown) {
      alert("토큰 검증 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <section className={styles.notice}>
      <div className={styles.pageTitle}>
        <div className={styles.container}>
          <h3>공지사항</h3>
        </div>
      </div>

      <div id="board-list">
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loadingMessage}>
              공지사항을 불러오는 중입니다...
            </div>
          ) : error ? (
            <div className={styles.loadingMessage}>{error}</div>
          ) : (
            <>
              <table className={styles.boardTable}>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th className={styles.thTitle}>제목</th>
                    <th className={styles.thAuthor}>작성자</th>
                    <th
                      onClick={toggleSortByDate}
                      className={`${styles.cursorPointer} ${
                        sortByDateNewest ? styles.sortedAsc : styles.sortedDesc
                      }`}
                    >
                      등록일
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length ? (
                    posts.map((post, index) => (
                      <tr key={post.id}>
                        <td>
                          {sortByDateNewest
                            ? currentPage * 25 + index + 1
                            : totalPages * 25 -
                              (currentPage * 25 + index)}
                        </td>
                        <td>
                          <Link href={`/board/view/${post.id}`}>
                            {post.title}
                          </Link>
                        </td>
                        <td>{post.creator}</td>
                        <td>{post.formattedDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>공지사항이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <span
                    key={index}
                    className={`${styles.pageNumber} ${
                      index === currentPage ? styles.active : ""
                    }`}
                    onClick={() => goToPage(index)}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div id="board-search">
        <div className={styles.container}>
          <div className={styles.searchWindow}>
            <form onSubmit={handleSearch}>
              <div className={styles.searchWrap}>
                <input
                  type="search"
                  placeholder="제목으로 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnDark}`}
                >
                  검색
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className={styles.writeBtnWrap}>
          <div className={styles.container}>
            <button
              type="button"
              className={styles.btn}
              onClick={handleWritePost}
            >
              공지사항 작성
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BoardPage;
