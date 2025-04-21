'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import '@toast-ui/editor/dist/toastui-editor.css';
import styles from './BoardDetail.module.css';
import { getAccessToken } from '../../../../../token';
import { useParams } from 'next/navigation';

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
}

const BoardDetailPage = () => {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchPost = async (id: string) => {
    setLoading(true);
    try {
      const token = getAccessToken();
      const response = await fetch(`http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/boards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('게시글 데이터를 불러오는 데 실패했습니다.');
      const data = await response.json();
      setPost({
        ...data.result,
        formattedDate: new Date(data.result.createdAt).toLocaleDateString(),
        creator: data.result.creator || { nickname: '알 수 없음' },
      });
    } catch (error) {
      setError('게시글을 불러오는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (id: string) => {
    try {
      const token = getAccessToken();
      const response = await fetch(`http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/board/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('댓글 데이터를 불러오는 데 실패했습니다.');
      const data = await response.json();

      setComments(
        data.result.map((c: any) => ({
          id: c.id,
          content: c.content,
          creator: c.creator || { nickname: '익명 사용자' },
          createdAt: c.createdAt,
        }))
      );
    } catch (error) {
      setError('댓글 데이터를 불러오는 중 문제가 발생했습니다.');
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

      const response = await fetch('http://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'PROBLEM',
          parentId: post?.id || 0,
          contents: newComment,
        }),
      });

      if (!response.ok) throw new Error('댓글 등록에 실패했습니다.');
      const data = await response.json();

      setComments((prev) => [
        ...prev,
        {
          id: data.result.id,
          content: data.result.content,
          creator: { nickname: data.result.creator.nickname },
          createdAt: data.result.createdAt,
        },
      ]);
      setNewComment('');
    } catch (error) {
      setError('댓글 등록 중 문제가 발생했습니다.');
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
        <div className={styles.viewerContainer}>
          <Viewer initialValue={post.contents} />
        </div>

        {/* 댓글 작성 폼을 댓글 목록 위로 이동 */}
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
                  <p>
                    <strong>{c.creator?.nickname || '익명 사용자'}</strong>
                  </p>
                  <p className={styles.commentContent}>{c.content}</p> {/* 댓글 내용에만 들여쓰기 적용 */}
                  <span className={styles.commentMeta}> | {new Date(c.createdAt).toLocaleDateString()}</span>
                </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
};

export default BoardDetailPage;
