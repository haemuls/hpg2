'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from './ProblemDetail.module.css';
import { getToken, getUserNickname } from '../../../../token';  // 최신 코드에서 제공한 함수 사용

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
  const { id: problemIdParam } = useParams();
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
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const problemData: ApiResponse<Problem> = await problemRes.json();
        setProblem(problemData.result);

        const commentsRes = await fetch(`${FILE_BASE_URL}/api/comments/problem/${problemId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const commentsData: ApiResponse<Comment[]> = await commentsRes.json();
        setComments(commentsData.result);

        const rankingRes = await fetch(`${FILE_BASE_URL}/api/problems/${problemId}/firstblood?size=5`, {
          headers: { 'Authorization': `Bearer ${token}` },
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
        headers: { "Authorization": `Bearer ${token}` },
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

  const handleShowVmAddress = () => {
    setVmAddress(problem?.dockerfileLink || "VM 주소가 제공되지 않았습니다.");
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
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
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
        comment.id === commentId ? { ...comment, isEditing: !comment.isEditing } : comment
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
          comment.id === commentId ? { ...comment, content: updatedComment.contents, isEditing: false } : comment
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
      <h3 className={styles.title}>{problem.title}</h3>
      <p className={styles.metaInfo}>
        출제자: {problem.creator} | 유형: {problem.kind} | 카테고리: {problem.type}
      </p>
      <p className={styles.metaInfo}>
        출제일: {new Date(problem.createdAt).toLocaleString()} | 리뷰어: {problem.reviewer}
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

      <div className={styles.viewerContainer}>
        <div dangerouslySetInnerHTML={{ __html: problem.detail }} />

        {problem.problemFile && (
          <div>
            <a href={`${FILE_BASE_URL}/uploads/${problem.problemFile}`} download>
              문제 파일 다운로드
            </a>
          </div>
        )}
        {/* 도커 관련 부분 주석 처리 */}
        {/* {problem.kind === "docker" && (
          <div>
            <button onClick={handleShowVmAddress}>VM 주소 보기</button>
            {vmAddress && <p>{vmAddress}</p>}
          </div>
        )} */}
      </div>

      <div className={styles.rankings}>
        <h4>1등 기록</h4>
        {ranking.length === 0 ? (
          <p>첫 번째 풀이자가 없습니다.</p>
        ) : (
          <ul>
            {ranking.map((entry, index) => (
              <li key={index}>
                {entry.nickname} (첫 풀이: {entry.firstBlood})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.flagInput}>
        <h4>정답 제출</h4>
        <input
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="정답을 입력하세요"
        />
        <button onClick={handleSubmit}>제출</button>
        {message && <p>{message}</p>}
      </div>

      <div className={styles.commentsSection}>
        <h4>댓글</h4>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <button type="submit" disabled={isSubmitting}>
            댓글 작성
          </button>
        </form>

        {comments.length === 0 && <p>댓글이 없습니다.</p>}

        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentSection}>
            <p>
              {comment.creator.nickname}{" "}
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
            </p>
            {comment.isEditing ? (
              <div>
                <textarea
                  value={comment.content}
                  onChange={(e) =>
                    handleCommentEdit(comment.id, e.target.value)
                  }
                />
                <button onClick={() => handleCommentEditToggle(comment.id)}>
                  취소
                </button>
              </div>
            ) : (
              <p>{comment.content}</p>
            )}

            <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
            <button onClick={() => handleCommentEditToggle(comment.id)}>
              {comment.isEditing ? '저장' : '수정'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CTFProblemPage;
