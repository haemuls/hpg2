"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  getToken,
  clearTokens,
  getMembershipId,
  getUserNickname,
} from "../../../../../token";
import styles from "./BoardEditPage.module.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor as ToastEditorInstance } from "@toast-ui/react-editor";

const ToastEditor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const API_BASE_URL = "https://api.hpground.xyz";

const BoardEditPage = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const editorRef = useRef<ToastEditorInstance>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const noticeId = typeof params?.noticeId === "string" ? params.noticeId : "";

  useEffect(() => {
    const initialize = async () => {
      const membershipId = getMembershipId();
      if (!membershipId) {
        alert("로그인이 필요합니다.");
        clearTokens();
        router.push("/login");
        return;
      }

      const token = await getToken();
      if (!token) {
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        clearTokens();
        router.push("/login");
        return;
      }

      const userNickname = await getUserNickname();
      setNickname(userNickname);

      if (!noticeId) {
        alert("잘못된 접근입니다.");
        router.push("/notice");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/boards/${noticeId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            alert("게시글을 찾을 수 없습니다.");
            router.push("/notice");
          } else {
            throw new Error(await response.text());
          }
          return;
        }

        const data = await response.json();
        setTitle(data.result.title);
        setContents(data.result.contents || "");
      } catch (error) {
        alert("게시글을 불러오는 데 실패했습니다.");
        router.push("/notice");
      }
    };

    initialize();
  }, [router, noticeId]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(contents);
    }
  }, [contents]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const markdown = editorRef.current?.getInstance().getMarkdown() || "";

    if (!title.trim() || !markdown.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    const postData = { title, type: "ANNOUNCE", contents: markdown, creator: nickname };

    try {
      const accessToken = await getToken();
      if (!accessToken) {
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        clearTokens();
        router.push("/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/boards/${noticeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("로그인이 만료되었습니다.");
          clearTokens();
          router.push("/login");
        } else if (response.status === 403) {
          alert("권한이 없습니다.");
        } else {
          throw new Error(await response.text());
        }
        return;
      }

      alert("게시글이 수정되었습니다.");
      router.push("/notice");
    } catch (error) {
      alert("게시글 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className={styles.boardEdit}>
      <div className={styles.container}>
        <h3>게시글 수정</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup} style={{ marginTop: "20px" }}>
            <label htmlFor="content">내용</label>
            <ToastEditor
              ref={editorRef}
              initialEditType="wysiwyg"
              height="500px"
              initialValue={contents}
              onChange={() => {
                const markdown = editorRef.current?.getInstance().getMarkdown() || "";
                setContents(markdown);
              }}
            />
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button type="submit" className={styles.btn}>
              게시글 수정
            </button>
          </div>
        </form>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link href="/board">공지사항으로 이동</Link>
        </div>
      </div>
    </div>
  );
};

export default BoardEditPage;
