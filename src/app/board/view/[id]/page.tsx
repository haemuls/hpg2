'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor.css';
import styles from './BoardDetail.module.css';
import { getToken, getUserNickname } from '../../../../../token';
import { useParams, useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';  // DOMPurify 추가

const Viewer = dynamic(() => import('@toast-ui/react-editor').then((mod) => mod.Viewer), { ssr: false });

interface Post {
  id: number;
  title: string;
  contents: string;
  creator: { nickname: string };
  createdAt: string;
  formattedDate: string;
}

interface Comment {
  id: number;
  content: string;
  creator?: { nickname: string };
  createdAt: string;
  isEditing: boolean;
}

const BoardDetailPage = () => {
  const params = useParams();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | null>(null);

  const fetchData = async (url: string, options: RequestInit = {}) => {
    const token = await getToken();
    if (!token) {
      setError('로그인이 필요합니다.');
      router.push('/login');
      return null;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: { Authorization: `Bearer ${token}`, ...options.headers },
      });

      if (!response.ok) throw new Error('데이터 로딩 오류!');
      return await response.json();
    } catch (error) {
      setError(error instanceof Error ? error.message : '데이터 로딩 오류!');
      return null;
    }
  };

  useEffect(() => {
    const fetchUserNickname = async () => {
      try {
        const nickname = await getUserNickname();
        setUserNickname(nickname);
      } catch (error) {
        console.error('닉네임을 가져오는 중 오류가 발생했습니다:', error);
        setUserNickname(null);
      }
    };

    // fetchUserNickname 함수 호출
    fetchUserNickname().catch((error) => {
      // 프로미스가 실패할 경우 처리
      console.error('닉네임을 가져오는 중 에러 발생:', error);
    });
  }, []);

  useEffect(() => {
    const loadParams = async () => {
      const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
      if (id) {
        setLoading(true);
        const postData = await fetchData(`https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/boards/${id}`);
        if (postData) {
          setPost({
            ...postData.result,
            formattedDate: new Date(postData.result.createdAt).toLocaleDateString(),
            creator: postData.result.creator || { nickname: '알 수 없음' },
          });
        }

        const commentsData = await fetchData(`https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/board/${id}`);
        if (commentsData) {
          setComments(
            commentsData.result
              .map((c: Comment) => ({
                id: c.id,
                content: c.content,
                creator: c.creator || { nickname: '익명 사용자' },
                createdAt: c.createdAt,
                isEditing: false,
              }))
              .sort((a: Comment, b: Comment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          );
        }
        setLoading(false);
      }
    };

    loadParams();
  }, [params?.id]);

  const handleDelete = async () => {
    if (!post) return;

    const response = await fetchData(`https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/boards/${post.id}`, { method: 'DELETE' });
    if (response) {
      router.push('/board');
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    const response = await fetchData(
      `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/${commentId}`,
      { method: 'DELETE' }
    );
    if (response) {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    }
  };

  const handleCommentEditToggle = (commentId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, isEditing: !comment.isEditing } : comment
      )
    );
  };

  const handleCommentEdit = async (commentId: number, newContent: string) => {
    if (!newContent.trim()) return;

    // 줄바꿈을 <br />로 변환
    const formattedContent = newContent.replace(/\n/g, '<br />');

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, content: formattedContent, isEditing: false } : comment
      )
    );

    const response = await fetchData(
      `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/${commentId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'BOARD', contents: formattedContent }),
      }
    );

    if (!response) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, content: prev.find((c) => c.id === commentId)?.content, isEditing: false } : comment
        )
      );
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const formattedContent = newComment.replace(/\n/g, '<br />');

    setIsSubmitting(true);
    const response = await fetchData(
      'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'BOARD', parentId: post?.id || 0, contents: formattedContent }),
      }
    );

    if (response) {
      setComments((prev) => [
        {
          id: response.result.id,
          content: response.result.content,
          creator: { nickname: response.result.creator.nickname },
          createdAt: response.result.createdAt,
          isEditing: false,
        },
        ...prev,
      ]);
      setNewComment('');
    }
    setIsSubmitting(false);
  };

  if (loading) return <p></p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <section className={styles.container}>
      <div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.metaInfo}>
          <span>작성자: {post.creator.nickname}</span> | <span>작성일: {post.formattedDate}</span>
        </p>
        <div className={`${styles.viewerContainer} ${styles.largeFont}`}>
          <Viewer initialValue={post.contents} />
        </div>

        {post.creator.nickname === userNickname && (
          <button onClick={handleDelete} className={styles.btnDelete}>
            삭제
          </button>
        )}

        <div className={styles.commentSection}>
          <h4 className={styles.commentTitle}>댓글</h4>
          <form onSubmit={handleCommentSubmit} className={styles.formGroup}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
            />
            <button type="submit" disabled={isSubmitting} className={styles.btnPrimary}>
              {isSubmitting ? '등록 중...' : '등록'}
            </button>
          </form>

          <ul>
            {comments.map((c: Comment) => (
              <li key={c.id} className={styles.commentItem}>
                <p>
                  <strong>{c.creator?.nickname || '익명 사용자'}</strong>
                </p>
                {c.isEditing ? (
                  <div>
                    <textarea
                      value={c.content}
                      onChange={(e) =>
                        setComments((prev) =>
                          prev.map((comment) =>
                            comment.id === c.id ? { ...comment, content: e.target.value } : comment
                          )
                        )
                      }
                      autoFocus
                      className={styles.commentEditTextarea}
                    />
                    <button
                      onClick={() => handleCommentEdit(c.id, c.content)}
                      className={styles.commentEditButton}
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCommentEditToggle(c.id)}
                      className={`${styles.commentEditButton} ${styles.cancel}`}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <p
                    className={styles.commentContent}
                    style={{ whiteSpace: 'pre-wrap' }}  // 줄바꿈 스타일 적용
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.content) }}
                  />
                )}
                <span className={styles.commentMeta}>
                  | 작성일: {new Date(c.createdAt).toLocaleDateString()}
                </span>
                {c.creator?.nickname === userNickname && (
                  <>
                    <span
                      onClick={() => handleCommentEditToggle(c.id)}
                      className={styles.commentEdit}
                    >
                      수정
                    </span>
                    <span
                      onClick={() => handleCommentDelete(c.id)}
                      className={styles.commentDelete}
                    >
                      삭제
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BoardDetailPage;
