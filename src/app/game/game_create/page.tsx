'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../../../../public/styles/bootstrap.css";
import "../../../../public/styles/notice.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/wargame-problems";

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
    creator: "",
    detail: "",
    source: "",
    kind: "웹해킹",
    level: "⭐⭐",
    flag: "",
    dockerfileLink: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [jwttoken, setJwttoken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwttoken');
    setJwttoken(token);
  }, []);

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
      if (!jwttoken) {
        alert('로그인이 필요합니다.');
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
        type: "WARGAME",
        reviewer: "",
        tags: [],
        level: levelMap[problem.level] ?? 1,
      };

      const formData = new FormData();
      const blob = new Blob([JSON.stringify(problemData)], { type: 'application/json' });
      formData.append("data", blob);

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwttoken}`,
        },
        body: formData,
      });

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
    <div className="card p-4 w-full max-w-2xl mx-auto">
      <div className="card-content">
        {/** 필드 렌더링 */}
        <div className="form-group">
          <label>제목</label>
          <input name="title" value={problem.title} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label>작성자</label>
          <input name="creator" value={problem.creator} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label>문제 설명</label>
          <textarea
            name="detail"
            value={problem.detail}
            onChange={handleChange}
            className="textarea"
          />
        </div>
        <div className="form-group">
          <label>문제 종류</label>
          <select name="kind" value={problem.kind} onChange={handleChange} className="select">
            <option value="웹해킹">웹해킹</option>
            <option value="포너블">포너블</option>
            <option value="리버싱">리버싱</option>
            <option value="암호학">암호학</option>
          </select>
        </div>
        <div className="form-group">
          <label>난이도</label>
          <select name="level" value={problem.level} onChange={handleChange} className="select">
            <option value="⭐">⭐ (쉬움)</option>
            <option value="⭐⭐">⭐⭐ (보통)</option>
            <option value="⭐⭐⭐">⭐⭐⭐ (어려움)</option>
          </select>
        </div>
        <div className="form-group">
          <label>정답 플래그</label>
          <input name="flag" value={problem.flag} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label>Dockerfile 링크</label>
          <input name="dockerfileLink" value={problem.dockerfileLink} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label>파일 업로드</label>
          <input type="file" onChange={handleFileChange} className="input" />
        </div>
        <button className="button mt-4 w-full" onClick={handleSubmit}>
          문제 제출
        </button>
      </div>
    </div>
  );
}
