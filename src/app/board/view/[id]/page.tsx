'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor.css';
import styles from './BoardDetail.module.css';
import { getAccessToken, getUserNickname } from '../../../../../token';
import { useParams, useRouter } from 'next/navigation';

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
  isEditing: boolean; // 수정 여부 상태 추가
}

interface CommentResponse {
  id: number;
  content: string;
  creator?: { nickname: string };
  createdAt: string;
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
    fetchUserNickname();
  }, []);

  const fetchPost = async (id: string) => {
    setLoading(true);
    try {
      const token = getAccessToken();
      const response = await fetch(
        `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/boards/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error('게시글 로딩 오류!');
      const data = await response.json();

      setPost({
        ...data.result,
        formattedDate: new Date(data.result.createdAt).toLocaleDateString(),
        creator: data.result.creator || { nickname: '알 수 없음' },
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : '게시글 로딩 오류!');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (id: string) => {
    try {
      const token = getAccessToken();
      if (!token) {
        setError('로그인 하세요!');
        router.push('/login');
        return;
      }

      const response = await fetch(
        `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/board/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error('댓글 로딩 오류!');
      const data: { result: CommentResponse[] } = await response.json();

      setComments(
        data.result
          .map((c) => ({
            id: c.id,
            content: c.content,
            creator: c.creator || { nickname: '익명 사용자' },
            createdAt: c.createdAt,
            isEditing: false, // 기본적으로 편집 모드 아님
          }))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : '댓글 로딩 오류!');
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    const token = getAccessToken();
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(
        `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/boards/${post.id}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error('게시글 삭제에 실패했습니다.');
      router.push('/board');
    } catch (error) {
      setError(error instanceof Error ? error.message : '게시글 삭제 중 문제가 발생했습니다.');
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    const token = getAccessToken();
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(
        `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/${commentId}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error('댓글 삭제에 실패했습니다.');
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      setError(error instanceof Error ? error.message : '댓글 삭제 중 문제가 발생했습니다.');
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
    const token = getAccessToken(); // 토큰 가져오기
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(
        `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/${commentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: 'PROBLEM',
            contents: newContent,
          }),
        }
      );

      if (response.status === 403) {
        throw new Error('권한이 없습니다.');
      }
      if (!response.ok) {
        throw new Error('댓글 수정에 실패했습니다.');
      }

      const updatedComment = await response.json();

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, content: updatedComment.contents, isEditing: false } : comment
        )
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : '댓글 수정 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    const loadParams = async () => {
      const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
      if (id) {
        await fetchPost(id);
        await fetchComments(id);
      }
    };

    loadParams();
  }, [params]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const token = getAccessToken();
      if (!token) throw new Error('로그인이 필요합니다.');

      const response = await fetch(
        'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: 'BOARD',
            parentId: post?.id || 0,
            contents: newComment,
          }),
        }
      );

      if (!response.ok) throw new Error('댓글 등록에 실패했습니다.');
      const data = await response.json();

      setComments((prev) =>
        [
          {
            id: data.result.id,
            content: data.result.content,
            creator: { nickname: data.result.creator.nickname },
            createdAt: data.result.createdAt,
            isEditing: false, // 새로운 댓글은 기본적으로 편집 모드 아님
          },
          ...prev,
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      );
      setNewComment('');
    } catch (error) {
      setError(error instanceof Error ? error.message : '댓글 등록 중 문제가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>게시글을 불러오는 중입니다...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <section className={styles.container}>
      <div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.metaInfo}>
          <span>{post.creator.nickname}</span> | <span>{post.formattedDate}</span>
        </p>
        <div className={`${styles.viewerContainer} ${styles.largeFont}`}>
          <Viewer initialValue={post.contents} />
        </div>
        <button onClick={handleDelete} className={styles.btnDelete}>삭제</button>
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
            {comments.map((c) => (
              <li key={c.id} className={styles.commentItem}>
                <p><strong>{c.creator?.nickname || '익명 사용자'}</strong></p>
                {c.isEditing ? (
                  <textarea
                    value={c.content}
                    onChange={(e) => {
                      setComments((prev) =>
                        prev.map((comment) =>
                          comment.id === c.id ? { ...comment, content: e.target.value } : comment
                        )
                      );
                    }}
                    placeholder="댓글을 수정하세요..."
                  />
                ) : (
                  <p className={styles.commentContent}>{c.content}</p>
                )}
                <span className={styles.commentMeta}>
                  | {new Date(c.createdAt).toLocaleDateString()}
                </span>
                {c.creator?.nickname === userNickname && (
                  <>
                    <span
                      onClick={() => handleCommentEditToggle(c.id)}
                      className={styles.commentEdit}
                    >
                      {c.isEditing ? '저장' : '수정'}
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
