'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../../../../public/styles/bootstrap.css";
import "../../../../public/styles/game_create.css";
import { getValidAccessToken, clearTokens, getMembershipId } from '../../../../token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/wargame-problems";

type WargameProblem = {
  title: string;
  creator: string;
  detail: string;
  source: string;
  kind: string;
  level: string; // ⭐, ⭐⭐, ⭐⭐⭐
  flag: string;
  dockerfileLink: string;
};

export default function WargameForm() {
  const router = useRouter();
  const [problem, setProblem] = useState<WargameProblem>({
    title: "",
    creator: "", // 작성자 제거
    detail: "",
    source: "",
    kind: "웹해킹",
    level: "⭐⭐",
    flag: "",
    dockerfileLink: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const storedMembershipId = getMembershipId();

    if (!storedMembershipId) {
      alert('로그인이 필요합니다.');
      clearTokens();
      router.push('/login');
      return;
    }

    const loadToken = async () => {
      const token = await getValidAccessToken();
      if (!token) {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
        clearTokens();
        router.push('/login');
      }
    };

    loadToken();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProblem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const accessToken = await getValidAccessToken();
      if (!accessToken) {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
        clearTokens();
        router.push('/login');
        return;
      }

      const levelMap: Record<string, number> = {
        "⭐": 1,
        "⭐⭐": 2,
        "⭐⭐⭐": 3,
      };

      const problemData = {
        ...problem,
        type: "WARGAME", // 고정된 타입
        reviewer: "",
        tags: [],
        level: levelMap[problem.level] ?? 1,
      };

      const headers: HeadersInit = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json", // 기본적으로 application/json 설정
      };

      let response;

      // 파일이 있을 경우 multipart/form-data로 전송
      if (file) {
        const formData = new FormData();

        // JSON 데이터를 Blob으로 감싸서 FormData에 추가
        const blob = new Blob([JSON.stringify(problemData)], { type: 'application/json' });
        formData.append('data', blob);

        // 파일을 FormData에 추가
        formData.append('file', file);

        response = await fetch(`${API_BASE_URL}`, {
          method: "POST",
          headers, // Content-Type은 자동으로 multipart/form-data로 설정됨
          body: formData, // FormData로 전송
        });
      } else {
        // 파일이 없으면 application/json 방식으로 JSON만 전송
        response = await fetch(`${API_BASE_URL}`, {
          method: "POST",
          headers,
          body: JSON.stringify(problemData), // JSON 데이터만 전송
        });
      }

      // 응답 처리
      if (response.ok) {
        alert("문제가 성공적으로 제출되었습니다.");
        router.push('/game');
      } else {
        const msg = await response.text();
        alert(`문제 제출 실패: ${msg}`);
      }
    } catch (error) {
      console.error("문제 제출 중 오류 발생", error);
      alert("문제 제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <h3 className="pageTitle">문제 제출</h3>
      <p>주의사항</p> {/* 고정된 글씨 추가 */}
      <div className="form-group">
        <label>제목</label>
        <input name="title" value={problem.title} onChange={handleChange} className="problemSelector" />
      </div>
      <div className="form-group">
        <label>문제 설명</label>
        <textarea
          name="detail"
          value={problem.detail}
          onChange={handleChange}
          className="textarea problemSelector"
        />
      </div>
      <div className="form-group">
        <label>문제 종류</label>
        <select name="kind" value={problem.kind} onChange={handleChange} className="problemSelector">
          <option value="웹해킹">웹해킹</option>
          <option value="포너블">포너블</option>
          <option value="리버싱">리버싱</option>
          <option value="암호학">암호학</option>
        </select>
      </div>
      <div className="form-group">
        <label>난이도</label>
        <select name="level" value={problem.level} onChange={handleChange} className="problemSelector">
          <option value="⭐">⭐ (쉬움)</option>
          <option value="⭐⭐">⭐⭐ (보통)</option>
          <option value="⭐⭐⭐">⭐⭐⭐ (어려움)</option>
        </select>
      </div>
      <div className="form-group">
        <label>정답 플래그</label>
        <input name="flag" value={problem.flag} onChange={handleChange} className="problemSelector" />
      </div>
      <div className="form-group">
        <label>Dockerfile 링크</label>
        <input name="dockerfileLink" value={problem.dockerfileLink} onChange={handleChange} className="problemSelector" />
      </div>
      <div className="form-group">
        <label>파일 업로드</label>
        <input type="file" onChange={handleFileChange} className="problemSelector" />
      </div>
      <div className="writeButtonWrap">
        <button className="btnDark" onClick={handleSubmit}>
          문제 제출
        </button>
      </div>
    </div>
  );
}
