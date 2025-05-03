'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../../../../public/styles/bootstrap.css";
import "../../../../public/styles/game_create.css";
import { getValidAccessToken, clearTokens, getMembershipId } from '../../../../token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/wargame-problems";

type WargameProblem = {
  title: string;
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
    detail: "",
    source: "",
    kind: "웹해킹",
    level: "⭐⭐",  // 기본값: ⭐⭐
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
      console.log("Access Token on Submit:", accessToken);

      if (!accessToken) {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
        clearTokens();
        router.push('/login');
        return;
      }

      // 레벨 맵 설정
      const levelMap: Record<string, number> = {
        "⭐": 1,    // ⭐ -> 1
        "⭐⭐": 2,   // ⭐⭐ -> 2
        "⭐⭐⭐": 3,  // ⭐⭐⭐ -> 3
      };

      // 문제 데이터 설정
      const problemData = {
        ...problem,
        type: "WARGAME",
        reviewer: "",
        tags: [],
        level: levelMap[problem.level] ?? 1,  // levelMap을 통해 숫자 값으로 변환
      };

      console.log("Problem Data to Send:", problemData);

      const headers: HeadersInit = {
        "Authorization": `Bearer ${accessToken}`,
      };

      let body: FormData | string;
      if (file) {
        // 파일이 있는 경우 FormData 사용
        const formData = new FormData();
        formData.append('data', JSON.stringify(problemData));  // JSON 데이터 추가
        formData.append('file', file);  // 파일 추가
        body = formData;
      } else {
        // 파일이 없는 경우 JSON 데이터 전송
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(problemData);
      }

      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers,  // 설정된 헤더 사용
        body,     // FormData 또는 JSON 데이터 본문으로 전송
      });

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (response.ok) {
        alert("문제가 성공적으로 제출되었습니다.");
        router.push('/game');
      } else {
        console.error("Submission Failed:", response.status);
        alert(`문제 제출 실패: ${responseText}`);
      }
    } catch (err) {
      console.error("Error Submitting Problem:", err);
      alert("문제 제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <h3 className="pageTitle">문제 제출</h3>
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
