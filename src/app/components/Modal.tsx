'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.css";
import { getMembershipId, getToken } from "../../../token";

// 사용자 정보에 대한 타입 정의
interface UserInfo {
  account: string;
  nickname: string;
  entireScore: number;
  fieldScores: {
    WARGAME: number;
  };
  solvedProblem: string[];
  created: string; // 실제로는 Date 객체로 변환할 예정
  lastActived: string; // 실제로는 Date 객체로 변환할 예정
}

// Modal 컴포넌트의 Props 타입 정의
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return; // 모달이 열릴 때만 데이터 로딩

    const loadUserData = async () => {
      try {
        const membershipId = getMembershipId();
        const jwtToken = await getToken();

        if (!membershipId || !jwtToken) {
          console.error("정보가 없습니다...");
          return;
        }

        const response = await axios.get(
          `https://api.hpground.xyz/api/users/${membershipId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        setUserInfo(response.data.result); // 응답에서 userInfo를 설정
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [isOpen]);

  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div
      className={styles["modal-overlay"]}
      onClick={onClose}
    >
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 배경 클릭 이벤트 막기
      >
        <div className={styles["modal-header"]}>
          <h2>유저 정보</h2>
        </div>
        <div className={styles["modal-body"]}>
          {loading ? (
            <p>정보를 불러오는 중...</p>
          ) : userInfo ? (
            <>
              <p>아이디: {userInfo.account}</p>
              <p>닉네임: {userInfo.nickname}</p>
              <p>총 점수: {userInfo.entireScore}</p>
              <p>워게임 점수: {userInfo.fieldScores.WARGAME}</p>
              <p>해결한 문제</p>
              <ul>
                {userInfo.solvedProblem.map((problem, index) => (
                  <li key={index}>{problem}</li>
                ))}
              </ul>
              <p>계정 생성일: {new Date(userInfo.created).toLocaleString()}</p>
              <p>마지막 활동: {new Date(userInfo.lastActived).toLocaleString()}</p>
            </>
          ) : (
            <p>사용자 정보를 가져오는 데 실패했습니다.</p>
          )}
        </div>
        <div className={styles["modal-footer"]}>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
