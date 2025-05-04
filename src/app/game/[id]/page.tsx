'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from './ProblemDetail.module.css';
import { getJwtToken } from '../../../../token'; // `getJwtToken`을 사용

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
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getJwtToken(); // `getJwtToken`을 사용하여 저장된 토큰을 가져옵니다.
    setToken(storedToken);
    setIsTokenLoaded(true);
  }, []);

  useEffect(() => {
    if (!isTokenLoaded) return;
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const problemRes = await fetch(`${API_BASE_URL}/${problemId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const problemData: ApiResponse<Problem> = await problemRes.json();
        setProblem(problemData.result);
        console.log("받아온 문제 정보:", problemData.result);

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
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, [problemId, token, isTokenLoaded]);

  const handleSubmit = async () => {
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
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(
        `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/${commentId}`,
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
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(
        `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/${commentId}`,
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

  if (!problem) return <p>문제를 불러오는 중입니다...</p>;

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>{problem.title}</h3>
      <p className={styles.metaInfo}>출제자: {problem.creator} | 유형: {problem.kind} | 카테고리: {problem.type}</p>
      <p className={styles.metaInfo}>출제일: {new Date(problem.createdAt).toLocaleString()} | 리뷰어: {problem.reviewer}</p>
      <div dangerouslySetInnerHTML={{ __html: problem.detail }} />
      {/* 나머지 렌더링 부분 */}
    </section>
  );
};

export default CTFProblemPage;
