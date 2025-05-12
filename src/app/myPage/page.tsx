'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.css";
import { getMembershipId, getToken } from "../../../token";

const Modal = ({ isOpen, onClose }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const loadUserData = async () => {
      try {
        const membershipId = getMembershipId();
        const jwtToken = await getToken();

        if (!membershipId || !jwtToken) {
          console.error("정보가 없습니다...");
          return;
        }

        const response = await axios.get(
          `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/users/${membershipId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        setUserInfo(response.data.result);
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
      onClick={onClose} // 배경 클릭 시 모달 닫기
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
          <button onClick={onClose}>닫기</button> {/* 닫기 버튼 */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
