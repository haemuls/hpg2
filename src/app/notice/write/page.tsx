'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, clearTokens, getMembershipId, getUserNickname } from '../../../../token';
import styles from './BoardWritePage.module.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor as ToastEditorInstance } from '@toast-ui/react-editor';

const ToastEditor = dynamic(() => import('@toast-ui/react-editor').then((mod) => mod.Editor), {
  ssr: false,
});

const API_BASE_URL = 'https://api.hpground.xyz';

const BoardWritePage = () => {
  const [title, setTitle] = useState('');
  const editorRef = useRef<ToastEditorInstance>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedMembershipId = getMembershipId();

    if (!storedMembershipId) {
      alert('로그인이 필요합니다.');
      clearTokens();
      router.push('/login');
      return;
    }

    const loadToken = async () => {
      const token = await getToken();
      if (!token) {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
        clearTokens();
        router.push('/login');
      }
    };

    const fetchNickname = async () => {
      const userNickname = await getUserNickname();
      if (userNickname) {
        setNickname(userNickname);
      }
    };

    loadToken();
    fetchNickname();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contents = editorRef.current?.getInstance().getMarkdown();

    if (!title.trim() || !contents.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    const postData = { title, type: 'ANNOUNCE', contents, creator: nickname };

    try {
      const accessToken = await getToken();
      if (!accessToken) {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
        clearTokens();
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('로그인이 만료되었습니다.');
          clearTokens();
          router.push('/login');
          return;
        } else if (response.status === 403) {
          alert('권한이 없습니다.');
          return;
        }
        throw new Error(await response.text());
      }

      setTitle('');
      editorRef.current?.getInstance().setMarkdown('');
      router.push('/notice');
    } catch (error) {
      console.error('공지사항 등록 오류:', error);
      alert('공지사항 등록에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className={styles.boardWrite}>
      <div className={styles.container}>
        <h3>공지사항 작성</h3>
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
          <div className={styles.formGroup} style={{ marginTop: '20px' }}>
            <label htmlFor="content">내용</label>
            <ToastEditor ref={editorRef} initialValue="" height="500px" />
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button type="submit" className={styles.btn}>
              공지사항 작성
            </button>
          </div>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/notice">공지사항으로 이동</Link>
        </div>
      </div>
    </div>
  );
};

export default BoardWritePage;
