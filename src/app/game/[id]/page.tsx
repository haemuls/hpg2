'use client';

import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import '../../../../public/styles/game_start.css';
import { getAccessToken } from '../../../../token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/wargame-problems";
const FILE_BASE_URL = API_BASE_URL.replace('/api/wargame-problems', '') || "http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";

interface Problem {
  title: string;
  creator: string;
  level: number;
  problemFile?: string;
  content: string;
  dockerfileLink?: string;
}

interface Ranking {
  nickname: string;
  created: string;
}

const CTFProblemPage = () => {
  const params = useParams();
  const problemId = params?.id || "6";

  const [problem, setProblem] = useState<Problem | null>(null);
  const [flag, setFlag] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [vmAddress, setVmAddress] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getAccessToken();
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) {
      alert("토큰이 존재하지 않습니다. 로그인 후 다시 시도해주세요.");
      return;
    }

    const fetchData = async (url: string, setter: (data: any) => void, errorMessage: string) => {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
          },
        });

        if (!res.ok) {
          throw new Error(`API 호출 실패: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setter(data.result);
      } catch (error) {
        console.error(errorMessage, error);
      }
    };

    fetchData(`${API_BASE_URL}/${problemId}`, setProblem, "문제 가져오기 실패");
    fetchRanking();
  }, [problemId, token]);

  const fetchRanking = async () => {
    try {
      const res = await fetch(`${FILE_BASE_URL}/api/problems/${problemId}/firstblood?size=3`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*',
        },
      });

      if (!res.ok) {
        throw new Error(`랭킹 API 호출 실패: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (Array.isArray(data.result)) {
        setRanking(data.result);
      } else {
        setRanking([data.result]);
      }
    } catch (error) {
      console.error("랭킹 조회 실패:", error);
    }
  };

  const handleSubmit = async () => {
    if (!token) return;

    try {
      const url = `${FILE_BASE_URL}/api/problems/${problemId}/solve?flag=${encodeURIComponent(flag)}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "*/*",
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

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleShowVmAddress = () => {
    setVmAddress(problem?.dockerfileLink || "VM 주소가 제공되지 않았습니다.");
  };

  if (!problem) return <div>로딩 중...</div>;

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="container">
      <div className="card">
        <h1>
          {problem.title}{" "}
          <span style={{fontSize: '0.5em'}}>made by {problem.creator}</span>
        </h1>

        <p>
          Level: <span style={{color: "gold"}}>{'⭐'.repeat(problem.level)}</span>
        </p>

        {problem.problemFile ? (
          <p>
            문제 파일:{" "}
            <a
              href={`${FILE_BASE_URL}/${problemId}/download`}
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{color: "blue", textDecoration: "underline"}}
            >
              다운로드
            </a>
          </p>
        ) : (
          <p>문제 파일 없음</p>
        )}
        <p>{problem.content}</p>

        <input
          type="text"
          placeholder="플래그를 입력하세요"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          className="input"
        />
        <button onClick={handleSubmit} className="button">제출</button>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="ranking-box">
        <h3>랭킹</h3>
        {ranking.length > 0 ? (
          ranking.map((user, index) => (
            <div key={index} className="ranking-item">
              <span className="rank">
                {index === 0 ? "👑" : index + 1}
              </span>
              <span className="username">{user.nickname}</span>
              <span className="solved-time">{formatTime(user.created)}</span>
            </div>
          ))
        ) : (
          <p>아직 풀이한 사용자가 없습니다.</p>
        )}
      </div>

      <div className="card">
        <h2>VM 주소</h2>
        <button onClick={handleShowVmAddress} className="button vm-button">
          VM 주소 보기
        </button>
        {vmAddress && <p className="vm-address">{vmAddress}</p>}
      </div>

      <div className="card">
        <h2>댓글</h2>
        <textarea
          className="textarea"
          placeholder="댓글을 작성하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={handleAddComment} className="submit-button comment-button">
          댓글 작성
        </button>
        <div className="comment-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <p className="comment-text">{comment}</p>
              <div className="reply-section">
                <button className="reply-button">대댓글</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CTFProblemPage;
