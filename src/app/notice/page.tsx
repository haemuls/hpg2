'use client';

import React, { useState, useEffect } from "react";
import styles from "./board.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken } from "../../../token";  // getValidJwtToken 대신

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";

// 게시글 타입 정의
interface Post {
  id: number;
  title: string;
  creator: string;
  lastModified: string;
  formattedDate: string;
}

interface BoardResponse {
  result: {
    content: Post[];
    totalPages: number;
    totalElements: number;
  };
}

const PAGE_SIZE = 25; // 페이지 크기를 상수로 관리

const BoardPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortByDateNewest, setSortByDateNewest] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const maxPageButtons = 5;

  const pageGroupStart = Math.floor(currentPage / maxPageButtons) * maxPageButtons;
  const pageGroupEnd = Math.min(pageGroupStart + maxPageButtons, totalPages);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const endpoint = searchTerm
        ? `${API_BASE_URL}/api/boards/search?type=ANNOUNCE&keyword=${encodeURIComponent(searchTerm)}&page=${currentPage}&size=${PAGE_SIZE}`
        : `${API_BASE_URL}/api/boards?type=ANNOUNCE&page=${currentPage}&size=${PAGE_SIZE}&sortByNewest=${sortByDateNewest}`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,  // 토큰 검증 후 설정
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("공지사항을 불러오는 데 실패했습니다.");
      }

      const data: BoardResponse = await response.json();
      const formattedPosts = data.result.content.map((post) => ({
        ...post,
        formattedDate: new Date(post.lastModified).toLocaleDateString(),
      }));

      setPosts(formattedPosts);
      setTotalPages(data.result.totalPages);
      setTotalElements(data.result.totalElements);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "공지사항을 불러오는 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    const token = await getToken();
    setIsLoggedIn(!!token);

    // JWT 토큰에서 "role"을 추출하여 "ROLE_ADMIN"인지 확인
    if (token) {
      const role = JSON.parse(atob(token.split('.')[1])).role;
      setIsAdmin(role === "ROLE_ADMIN");
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchPosts();
  };

  const toggleSortByDate = () => {
    setSortByDateNewest((prev) => !prev);
    setCurrentPage(0);
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      fetchPosts();
    } else {
      alert("유효하지 않은 페이지입니다.");
    }
  };

  const handleWritePost = async () => {
    const token = await getToken();
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    // JWT 토큰에서 "role"을 추출하여 "ROLE_ADMIN"인지 확인
    const role = JSON.parse(atob(token.split('.')[1])).role;
    if (role !== "ROLE_ADMIN") {
      alert("관리자만 공지사항을 작성할 수 있습니다.");
      return;
    }

    router.push("/board/write");
  };

  useEffect(() => {
    fetchPosts();
    checkLoginStatus();
  }, [sortByDateNewest, currentPage]);

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
              게시글을 불러오는 중입니다...
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
                            ? totalElements - (currentPage * PAGE_SIZE + index)
                            : currentPage * PAGE_SIZE + index + 1}
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
                {currentPage > 0 && (
                  <span
                    className={styles.pageNumber}
                    onClick={() => goToPage(0)}
                  >
                    {"<<"}
                  </span>
                )}

                {currentPage > maxPageButtons - 1 && (
                  <span
                    className={styles.pageNumber}
                    onClick={() => goToPage(currentPage - maxPageButtons)}
                  >
                    {"<"}
                  </span>
                )}

                {Array.from({ length: pageGroupEnd - pageGroupStart }, (_, index) => (
                  <span
                    key={pageGroupStart + index}
                    className={`${styles.pageNumber} ${
                      currentPage === pageGroupStart + index ? styles.active : ""
                    }`}
                    onClick={() => goToPage(pageGroupStart + index)}
                  >
                    {pageGroupStart + index + 1}
                  </span>
                ))}

                {currentPage < totalPages - maxPageButtons && (
                  <span
                    className={styles.pageNumber}
                    onClick={() => goToPage(currentPage + maxPageButtons)}
                  >
                    {">"}
                  </span>
                )}

                {currentPage < totalPages - 1 && (
                  <span
                    className={styles.pageNumber}
                    onClick={() => goToPage(totalPages - 1)}
                  >
                    {">>"}
                  </span>
                )}
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

      <div className={styles.writeBtnWrap}>
        <div className={styles.container}>
          {isAdmin && (
            <button
              type="button"
              className={styles.btn}
              onClick={handleWritePost}
            >
              공지사항 작성
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BoardPage;
