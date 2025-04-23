'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor.css';
import './BoardDetail.module.css';

const Viewer = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Viewer), { ssr: false });

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/boards";
const COMMENT_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments`;

interface Post {
  id: number;
  title: string;
  contents: string;
  creator: { nickname: string } | null;
  createdAt: string;
  formattedDate: string;
  type: 'notice' | 'default';
}

interface Comment {
  id: number;
  content: string;
  creator?: { nickname: string } | null;
  createdAt: string;
}

// BoardDetailPageProps 타입 수정
interface BoardDetailPageProps {
  params: Promise<{
    id: string;  // 'id'는 string으로 정의
  }>;
}

const BoardDetailPage: React.FC<BoardDetailPageProps> = ({ params }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params;

      if (!id) {
        setError('잘못된 게시글 ID입니다.');
        setLoading(false);
        return;
      }

      const fetchPost = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/${id}`);
          if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');

          const data = await response.json();
          const formattedPost = {
            ...data.result,
            id: Number(data.result.id),
            formattedDate: data.result.createdAt ? new Date(data.result.createdAt).toLocaleDateString() : '날짜 없음',
            creator: data.result.creator || { nickname: '알 수 없음' },
            type: data.result.type || 'default',
          };

          setPost(formattedPost);
          setError('');
        } catch (error) {
          console.error("❌ 오류 발생:", error);
          setError('게시글을 불러오는 중 문제가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      };

      const fetchComments = async () => {
        try {
          const response = await fetch(`${COMMENT_API_URL}?postId=${id}`);
          if (!response.ok) throw new Error('댓글 데이터를 가져오는 중 오류 발생');

          const data = await response.json();
          setComments(data.result || []);
        } catch (error) {
          console.error('❌ 댓글 로드 오류:', error);
          setError('댓글을 불러오는 중 문제가 발생했습니다.');
        }
      };

      fetchPost();
      fetchComments();
    };

    fetchParams();
  }, [params]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;
  if (!post || post.type !== "notice") return <p>해당 게시글은 표시할 수 없습니다.</p>;

  return (
    <section>
      <div>
        <h3>{post.title}</h3>
        <p>작성자: {post.creator?.nickname}</p>
        <p>등록일: {post.formattedDate}</p>
        <div>
          <Viewer initialValue={post.contents || "내용이 없습니다."} />
        </div>
        <div>
          <h4>댓글</h4>
          {comments.length === 0 ? (
            <p>아직 댓글이 없습니다.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="border-b border-gray-300 py-4">
                <p className="font-semibold">{c.creator?.nickname || '익명 사용자'}</p>
                <p>{c.content}</p>
                <p className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BoardDetailPage;
