'use client';

import React, {useEffect, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import styles from './ProblemDetail.module.css';
import {getToken, getUserNickname} from '../../../../token';  // 최신 코드에서 제공한 함수 사용
import {format} from 'date-fns'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/wargame-problems";
const FILE_BASE_URL = API_BASE_URL.replace('/api/wargame-problems', '') || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";

interface Problem {
  id: number;
  title: string;
  creator: string;
  level: string;
  detail: string;
  problemFile?: string;
  probelmFileSize?: number | null;
  kind: string;
  type: string;
  tags?: string[];
  reviewer?: string;
  source?: string;
  correctCount: number;
  entireCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Ranking {
  nickname: string;
  firstBlood: string;
  id: number;
}

interface Comment {
  id: number;
  creator: { nickname: string };
  createdAt: string;
  content: string;
  isEditing?: boolean;
}

interface ApiResponse<T> {
  result: T;
}

const CTFProblemPage = () => {
  const {id: problemIdParam} = useParams();
  const router = useRouter();
  const problemId = problemIdParam || "6";

  const [problem, setProblem] = useState<Problem | null>(null);
  const [flag, setFlag] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [vmAddress, setVmAddress] = useState<string>("");
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (!token) {
        alert("로그인이 필요한 서비스입니다.");
        router.push("/login");
      }
    };

    fetchToken();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("Token is not available");

        const problemRes = await fetch(`${API_BASE_URL}/${problemId}`, {
          headers: {'Authorization': `Bearer ${token}`},
        });
        const problemData: ApiResponse<Problem> = await problemRes.json();
        setProblem(problemData.result);

        const commentsRes = await fetch(`${FILE_BASE_URL}/api/comments/problem/${problemId}`, {
          headers: {'Authorization': `Bearer ${token}`},
        });
        const commentsData: ApiResponse<Comment[]> = await commentsRes.json();
        setComments(commentsData.result);

        const rankingRes = await fetch(`${FILE_BASE_URL}/api/problems/${problemId}/firstblood?size=5`, {
          headers: {'Authorization': `Bearer ${token}`},
        });
        const rankingData: ApiResponse<Ranking[]> = await rankingRes.json();
        setRanking(rankingData.result);

        const nickname = await getUserNickname();
        setUserNickname(nickname);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [problemId]);

  const handleSubmit = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      const res = await fetch(`${FILE_BASE_URL}/api/problems/${problemId}/solve?flag=${encodeURIComponent(flag)}`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`},
      });

      if (!res.ok) {
        setMessage("정답 확인 중 오류가 발생했습니다.");
        return;
      }

      const data = await res.json();
      setMessage(data.result ? "정답입니다! 축하합니다." : "오답입니다. 다시 시도하세요.");
    } catch (error) {
      console.error("정답 확인 실패:", error);
      setMessage("정답 확인 중 오류가 발생했습니다.");
    }
  };

  const handleShowVmAddress = async () => {
  const token = await getToken();
  if (!token) {
    alert("로그인 후 이용할 수 있습니다.");
    return;
  }

  try {
    const response = await fetch(
      `${FILE_BASE_URL}/api/pods/create?userId=${userNickname}&problemId=${problemId}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("VM 주소 생성에 실패했습니다.");
    }

    const data = await response.json();
    setVmAddress(data.result || "VM 주소를 생성할 수 없습니다.");
  } catch (error) {
    console.error("VM 주소 생성 실패:", error);
    setVmAddress("VM 주소 생성 중 오류가 발생했습니다.");
  }
};

  const handleFileDownload = async () => {
  const token = await getToken();
  if (!token) {
    alert("로그인이 필요한 서비스입니다.");
    return;
  }

  try {
    const response = await fetch(
      `${FILE_BASE_URL}/api/problems/${problem?.id}/download`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("파일 다운로드 실패:", errorText);
      alert(`파일 다운로드 실패: ${response.status} ${response.statusText}`);
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = problem?.problemFile || "downloaded_file";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("파일 다운로드 중 문제가 발생했습니다:", error);
    alert("파일 다운로드 중 문제가 발생했습니다. 다시 시도해주세요.");
  }
};

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const token = await getToken();
    if (!token) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    try {
      const res = await fetch(`${FILE_BASE_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "PROBLEM",
          problemId,
          contents: newComment,
        }),
      });

      if (!res.ok) throw new Error("댓글 등록 실패");
      const data = await res.json();
      setComments([data.result, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    const token = await getToken();
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(
          `${FILE_BASE_URL}/api/comments/${commentId}`,
          {method: 'DELETE', headers: {Authorization: `Bearer ${token}`}}
      );

      if (!response.ok) throw new Error('댓글 삭제에 실패했습니다.');
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      setError(error instanceof Error ? error.message : '댓글 삭제 중 문제가 발생했습니다.');
    }
  };

  const handleCommentEditToggle = (commentId: number) => {
    setComments((prev) =>
        prev.map((comment) =>
            comment.id === commentId ? {...comment, isEditing: !comment.isEditing} : comment
        )
    );
  };

  const handleCommentEdit = async (commentId: number, newContent: string) => {
    const token = await getToken();
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(
          `${FILE_BASE_URL}/api/comments/${commentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: 'PROBLEM',
              contents: newContent,
            }),
          }
      );

      if (response.status === 403) {
        throw new Error('권한이 없습니다.');
      }
      if (!response.ok) {
        throw new Error('댓글 수정에 실패했습니다.');
      }

      const updatedComment = await response.json();

      setComments((prev) =>
          prev.map((comment) =>
              comment.id === commentId ? {...comment, content: updatedComment.contents, isEditing: false} : comment
          )
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : '댓글 수정 중 문제가 발생했습니다.');
    }
  };

  if (loading) return <p>문제를 불러오는 중입니다...</p>;

  if (!problem) return <p>문제를 찾을 수 없습니다.</p>;

  return (
  <section className={styles.container}>
    <div className={styles.mainContent}>
      <h3 className={styles.title}>{problem.title}</h3>
      <p className={styles.metaInfo}>
        출제자: {problem.creator} | 종류: {problem.kind}
      </p>
      <p className={styles.metaInfo}>
        출제일: {new Date(problem.createdAt).toLocaleDateString()} | 리뷰어: {problem.reviewer}
      </p>
      <p className={`${styles.metaInfo} ${styles.last}`}>
        정답률: {problem.entireCount === 0 ? '제출 없음' : `${((problem.correctCount / problem.entireCount) * 100).toFixed(2)}%`}
        ({problem.correctCount}/{problem.entireCount})
      </p>

      {problem.tags?.length > 0 && (
        <div className={styles.metaInfo}>
          태그: {problem.tags.join(', ')}
        </div>
      )}

      {problem.source && (
        <div className={styles.metaInfo}>
          출처: {problem.source}
        </div>
      )}

      {/* 문제 설명 섹션 */}
      <div className={styles.viewerContainer}>
        <div dangerouslySetInnerHTML={{ __html: problem.detail }} />
      </div>

      {/* 정답 제출 섹션 */}
      <div className={styles.flagSection}>
        <h4 className={styles.flagTitle}>정답 제출</h4>
        <form className={styles.flagForm} onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.flagInput}
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            placeholder="정답을 입력하세요"
          />
          {message && <p className={styles.flagMessage}>{message}</p>}
          <button className={styles.flagButton} type="submit">제출</button>
        </form>
      </div>

      <div className={styles.buttonContainer}>
        <div className={styles.buttonBox}>
          <button
            className={styles.downloadButton}
            onClick={handleFileDownload}
            disabled={!problem?.problemFile}
          >
            파일 다운로드
          </button>
        </div>
        <div className={styles.buttonBox}>
          <button onClick={handleShowVmAddress} className={styles.vmButton}>
            VM 주소 보기
          </button>
          {vmAddress && <p className={styles.vmAddress}>{vmAddress}</p>}
        </div>
      </div>
            {/* 랭킹 박스 섹션 */}
      {ranking && ranking.length > 0 ? (
  <div className={styles.rankingBox}>
    <h4 className={styles.rankingTitle}>🏆 랭킹</h4>
    <ul className={styles.rankingList}>
      {ranking.map((rank, index) => (
        <li key={rank.id} className={styles.rankingItem}>
          <span className={styles.rankNumber}>{index + 1}</span>
          <span className={styles.rankName}>{rank.nickname}</span>
          <span className={styles.rankTime}>
            {rank.firstBlood
              ? format(new Date(rank.firstBlood).toLocaleString("en-US", { timeZone: "Asia/Seoul" }), 'yyyy-MM-dd HH:mm')
              : "문제를 푼 사람이 없습니다."}
          </span>
        </li>
      ))}
    </ul>
  </div>
) : (
  <div className={styles.rankingBox}>
    <h4 className={styles.rankingTitle}>🏆 랭킹</h4>
    <p className={styles.noRanking}>아직 문제를 푼 사람이 없습니다.</p>
  </div>
)}

      <div className={styles.commentsSection}>
        <h4 className={styles.commentTitle}>댓글</h4>
        <form onSubmit={handleCommentSubmit} className={styles.formGroup}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <button type="submit" disabled={isSubmitting} className={styles.btnPrimary}>
            {isSubmitting ? '등록 중...' : '등록'}
          </button>
        </form>
        <ul>
          {comments.map((c) => (
            <li key={c.id} className={styles.commentItem}>
              <p>
                <strong>{c.creator?.nickname || '익명 사용자'}</strong>
              </p>
              {c.isEditing ? (
                <textarea
                  value={c.content}
                  onChange={(e) =>
                    setComments((prev) =>
                      prev.map((comment) =>
                        comment.id === c.id
                          ? { ...comment, content: e.target.value }
                          : comment
                      )
                    )
                  }
                  placeholder="댓글을 수정하세요..."
                />
              ) : (
                <p className={styles.commentContent}>{c.content}</p>
              )}
              <span className={styles.commentMeta}>
                | {new Date(c.createdAt).toLocaleDateString()}
              </span>
              {c.creator?.nickname === userNickname && (
                <>
                  <span
                    onClick={() => handleCommentEditToggle(c.id)}
                    className={styles.commentEdit}
                  >
                    {c.isEditing ? '저장' : '수정'}
                  </span>
                  <span
                    onClick={() => handleCommentDelete(c.id)}
                    className={styles.commentDelete}
                  >
                    삭제
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
}

export default CTFProblemPage;