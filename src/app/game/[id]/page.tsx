"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import styles from './game_start.module.css';  // CSS Module 임포트
import { getAccessToken } from '../../../../token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/wargame-problems";
const FILE_BASE_URL = API_BASE_URL.replace('/api/wargame-problems', '') || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";

interface Problem {
  title: string;
  creator: string;
  level: number;
  problemFile?: string;
  detail: string;
  dockerfileLink?: string;
}

interface Ranking {
  nickname: string;
  firstBlood: string;
}

interface Comment {
  id: number;
  creator: {
    nickname: string;
  };
  createdAt: string;
  content: string;
}

interface ApiResponse<T> {
  result: T;
}

const CTFProblemPage = () => {
  const params = useParams();
  const router = useRouter();
  const problemId = Array.isArray(params?.id) ? params.id[0] : params?.id || "6";

  const [problem, setProblem] = useState<Problem | null>(null);
  const [flag, setFlag] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [vmAddress, setVmAddress] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    const storedToken = getAccessToken();
    setToken(storedToken);
    setIsTokenLoaded(true); // 토큰 로딩 완료
  }, []);

  useEffect(() => {
    if (!isTokenLoaded) return;

    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login"); // 로그인 페이지로 리다이렉트
      return;
    }

    const fetchProblem = async () => {
      try {
        const res = await fetch(`https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/problems/${problemId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
          },
        });

        if (!res.ok) {
          throw new Error(`문제 API 호출 실패: ${res.status} ${res.statusText}`);
        }

        const data: ApiResponse<Problem> = await res.json();
        setProblem(data.result);
      } catch (error) {
        console.error("문제 가져오기 실패:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`${FILE_BASE_URL}/api/comments/problem/${problemId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
          },
        });

        if (!res.ok) {
          throw new Error(`댓글 API 호출 실패: ${res.status} ${res.statusText}`);
        }

        const data: ApiResponse<Comment[]> = await res.json();
        setComments(data.result);
      } catch (error) {
        console.error("댓글 가져오기 실패:", error);
      }
    };

    const fetchRanking = async () => {
      try {
        const res = await fetch(`${FILE_BASE_URL}/api/problems/${problemId}/firstblood?size=5`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
          },
        });

        if (!res.ok) {
          throw new Error(`랭킹 API 호출 실패: ${res.status} ${res.statusText}`);
        }

        const data: ApiResponse<Ranking[]> = await res.json();
        if (Array.isArray(data.result)) {
          setRanking(data.result);
        } else {
          setRanking([data.result]); // 객체를 배열로 감싸서 상태에 저장
        }
      } catch (error) {
        console.error("랭킹 조회 실패:", error);
      }
    };

    fetchProblem();
    fetchComments();
    fetchRanking();
  }, [problemId, token, isTokenLoaded]);

  const handleSubmit = async () => {
    if (!token) return;

    try {
      const url = `${FILE_BASE_URL}/api/problems/${problemId}/solve?flag=${encodeURIComponent(flag)}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": '*/*',
        },
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

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: "PROBLEM", // "PROBLEM"으로 설정
          parentId: problemId, // 부모 댓글 ID는 문제 ID로 설정
          contents: newComment, // 댓글 내용
        }),
      });

      if (!res.ok) {
        throw new Error(`댓글 작성 실패: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setComments((prevComments) => [...prevComments, data.result]); // 새 댓글을 댓글 목록에 추가
      setNewComment(""); // 댓글 작성 후 입력값 초기화
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  const handleShowVmAddress = () => {
    setVmAddress(problem?.dockerfileLink || "VM 주소가 제공되지 않았습니다.");
  };

  if (!problem) return <div>로딩 중...</div>;

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div className={styles.game_start}>
      <h1>{problem.title}</h1>
      <p>작성자: {problem.creator}</p>
      <p>레벨: {problem.level}</p>
      <div className={styles.problemDetails}>
        <p>{problem.detail}</p>
        {problem.dockerfileLink && (
          <button onClick={handleShowVmAddress}>VM 주소 보기</button>
        )}
        {vmAddress && <p>VM 주소: {vmAddress}</p>}
      </div>

      <div>
        <h3>정답 제출</h3>
        <input
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="정답을 입력하세요"
        />
        <button onClick={handleSubmit}>정답 제출</button>
        <p>{message}</p>
      </div>

      <div>
        <h3>댓글</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className={styles.comment} key={comment.id}>
              <strong className={styles.creator}>{comment.creator.nickname}</strong>
              <p>{comment.content}</p>
              <small>{formatTime(comment.createdAt)}</small>
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleAddComment}>댓글 추가</button>
      </div>

      <div>
        <h3>랭킹</h3>
        {ranking.length > 0 ? (
          <ul>
            {ranking.map((rank, index) => (
              <li key={index}>
                {rank.nickname} - 첫 번째 정답: {rank.firstBlood}
              </li>
            ))}
          </ul>
        ) : (
          <p>랭킹 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CTFProblemPage;
