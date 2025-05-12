'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../../../../public/styles/bootstrap.css";
import "../../../../public/styles/game_create.css";
import { getToken, clearTokens, getMembershipId } from '../../../../token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/wargame-problems";

type WargameProblem = {
  title: string;
  detail: string;
  source: string;
  kind: string;
  level: string;
  flag: string;
  dockerfileLink: string;
};

export default function WargameForm() {
  const router = useRouter();
  const [problem, setProblem] = useState<WargameProblem>({
    title: "",
    detail: "",
    source: "",
    kind: "",
    level: "⭐⭐",
    flag: "",
    dockerfileLink: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    console.log("useEffect: Checking membership ID");
    const storedMembershipId = getMembershipId();
    console.log("Stored Membership ID:", storedMembershipId);

    if (!storedMembershipId) {
      alert('로그인이 필요합니다.');
      clearTokens();
      router.push('/login');
      return;
    }

    const loadToken = async () => {
      console.log("Loading token...");
      const token = await getToken();
      console.log("Loaded Token:", token);

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
    console.log(`handleChange: ${name} = ${value}`);
    setProblem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log("handleFileChange: Selected file:", e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit: Starting submission...");
    try {
      const accessToken = await getToken();
      console.log("handleSubmit: Retrieved Access Token:", accessToken);

      if (!accessToken) {
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        clearTokens();
        router.push("/login");
        return;
      }

      const levelMap: Record<string, number> = {
        "⭐": 1,
        "⭐⭐": 2,
        "⭐⭐⭐": 3,
      };

      const problemData = {
        title: problem.title,
        type: "WARGAME",
        detail: problem.detail,
        source: problem.source,
        tags: [], // tags는 빈 배열로 처리됨
        kind: problem.kind ? problem.kind.toUpperCase() : "",
        level: levelMap[problem.level] ?? 1,
        flag: problem.flag,
        dockerfileLink: problem.dockerfileLink,
      };

      console.log("handleSubmit: Problem Data to Submit:", problemData);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const formData = new FormData();
      formData.append("data", new Blob([JSON.stringify(problemData)], { type: "application/json" }));

      if (file) {
        formData.append("file", file);
      }

      console.log("handleSubmit: FormData with file created:", formData);

      // 헤더에서 Content-Type을 제거하고, FormData를 body로 전송
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers, // headers만 사용하고 Content-Type은 제거
        body: formData,
      });

      console.log("handleSubmit: Response Status:", response.status);

      if (response.ok) {
        alert("문제가 성공적으로 제출되었습니다.");
        router.push("/game");
      } else {
        const errorText = await response.text();
        console.error("handleSubmit: Submission failed:", errorText);
        alert("문제 제출 실패");
      }
    } catch (err) {
      console.error("handleSubmit: Error during submission:", err);
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
          <option value="">문제 종류를 선택하세요</option>
          <option value="WEBHACKING">웹해킹</option>
          <option value="SYSTEM">포너블</option>
          <option value="REVERSING">리버싱</option>
          <option value="CRYPTO">암호학</option>
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
