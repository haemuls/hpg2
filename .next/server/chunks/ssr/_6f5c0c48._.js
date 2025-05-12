module.exports = {

"[project]/src/app/board/view/[id]/BoardDetail.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "btnDelete": "BoardDetail-module__4Bv4dq__btnDelete",
  "btnPrimary": "BoardDetail-module__4Bv4dq__btnPrimary",
  "commentContent": "BoardDetail-module__4Bv4dq__commentContent",
  "commentDelete": "BoardDetail-module__4Bv4dq__commentDelete",
  "commentEdit": "BoardDetail-module__4Bv4dq__commentEdit",
  "commentItem": "BoardDetail-module__4Bv4dq__commentItem",
  "commentMeta": "BoardDetail-module__4Bv4dq__commentMeta",
  "commentSection": "BoardDetail-module__4Bv4dq__commentSection",
  "commentTitle": "BoardDetail-module__4Bv4dq__commentTitle",
  "container": "BoardDetail-module__4Bv4dq__container",
  "formGroup": "BoardDetail-module__4Bv4dq__formGroup",
  "metaInfo": "BoardDetail-module__4Bv4dq__metaInfo",
  "title": "BoardDetail-module__4Bv4dq__title",
  "titleRow": "BoardDetail-module__4Bv4dq__titleRow",
  "viewerContainer": "BoardDetail-module__4Bv4dq__viewerContainer",
});
}}),
"[project]/src/app/board/view/[id]/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$view$2f5b$id$5d2f$BoardDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/board/view/[id]/BoardDetail.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/token.ts [app-ssr] (ecmascript)"); // 수정된 부분
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const BoardDetailPage = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const [post, setPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // 게시글 정보 요청 함수
    const fetchPost = async (id)=>{
        setLoading(true);
        try {
            const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getValidJwtToken"])(); // 수정된 부분
            if (!token) throw new Error('토큰이 유효하지 않습니다.');
            const response = await fetch(`https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/boards/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('게시글 로딩 오류!');
            const data = await response.json();
            setPost({
                ...data.result,
                formattedDate: new Date(data.result.createdAt).toLocaleDateString(),
                creator: data.result.creator || {
                    nickname: '알 수 없음'
                }
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : '게시글 로딩 오류!');
        } finally{
            setLoading(false);
        }
    };
    // 댓글 목록 요청 함수
    const fetchComments = async (id)=>{
        try {
            const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getValidJwtToken"])(); // 수정된 부분
            if (!token) {
                setError('로그인 하세요!');
                router.push('/login');
                return;
            }
            const response = await fetch(`https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/comments/board/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('댓글 로딩 오류!');
            const data = await response.json();
            setComments(data.result.map((c)=>({
                    id: c.id,
                    content: c.content,
                    creator: c.creator || {
                        nickname: '익명 사용자'
                    },
                    createdAt: c.createdAt,
                    isEditing: false
                })).sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        } catch (error) {
            setError(error instanceof Error ? error.message : '댓글 로딩 오류!');
        }
    };
    // 게시글 삭제 함수
    const handleDelete = async ()=>{
        if (!post) return;
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getValidJwtToken"])(); // 수정된 부분
        if (!token) {
            setError('로그인이 필요합니다.');
            return;
        }
        try {
            const response = await fetch(`https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/boards/${post.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('게시글 삭제에 실패했습니다.');
            router.push('/board');
        } catch (error) {
            setError(error instanceof Error ? error.message : '게시글 삭제 중 문제가 발생했습니다.');
        }
    };
    // 페이지가 로드되었을 때 게시글과 댓글을 불러오기
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (id) {
            fetchPost(id);
            fetchComments(id);
        }
    }, [
        id
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$view$2f5b$id$5d2f$BoardDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "로딩 중..."
            }, void 0, false, {
                fileName: "[project]/src/app/board/view/[id]/page.tsx",
                lineNumber: 132,
                columnNumber: 19
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$view$2f5b$id$5d2f$BoardDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].error,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/board/view/[id]/page.tsx",
                lineNumber: 133,
                columnNumber: 17
            }, this),
            post && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$view$2f5b$id$5d2f$BoardDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].post,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: post.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/board/view/[id]/page.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: post.content
                    }, void 0, false, {
                        fileName: "[project]/src/app/board/view/[id]/page.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        children: [
                            post.formattedDate,
                            " | 작성자: ",
                            post.creator.nickname
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/board/view/[id]/page.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDelete,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$view$2f5b$id$5d2f$BoardDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].deleteButton,
                        children: "삭제"
                    }, void 0, false, {
                        fileName: "[project]/src/app/board/view/[id]/page.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/board/view/[id]/page.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$view$2f5b$id$5d2f$BoardDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].comments,
                children: comments.map((comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$view$2f5b$id$5d2f$BoardDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].comment,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: comment.content
                            }, void 0, false, {
                                fileName: "[project]/src/app/board/view/[id]/page.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: [
                                    comment.creator?.nickname || '익명',
                                    " | ",
                                    new Date(comment.createdAt).toLocaleDateString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/board/view/[id]/page.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this)
                        ]
                    }, comment.id, true, {
                        fileName: "[project]/src/app/board/view/[id]/page.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/board/view/[id]/page.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/board/view/[id]/page.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = BoardDetailPage;
}}),
"[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)");
}}),

};

//# sourceMappingURL=_6f5c0c48._.js.map