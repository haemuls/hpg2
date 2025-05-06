module.exports = {

"[project]/src/app/game/[id]/ProblemDetail.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "btnDelete": "ProblemDetail-module__k9Mj0W__btnDelete",
  "btnPrimary": "ProblemDetail-module__k9Mj0W__btnPrimary",
  "buttonBox": "ProblemDetail-module__k9Mj0W__buttonBox",
  "buttonContainer": "ProblemDetail-module__k9Mj0W__buttonContainer",
  "commentContent": "ProblemDetail-module__k9Mj0W__commentContent",
  "commentDelete": "ProblemDetail-module__k9Mj0W__commentDelete",
  "commentEdit": "ProblemDetail-module__k9Mj0W__commentEdit",
  "commentItem": "ProblemDetail-module__k9Mj0W__commentItem",
  "commentMeta": "ProblemDetail-module__k9Mj0W__commentMeta",
  "commentSection": "ProblemDetail-module__k9Mj0W__commentSection",
  "commentTitle": "ProblemDetail-module__k9Mj0W__commentTitle",
  "container": "ProblemDetail-module__k9Mj0W__container",
  "downloadButton": "ProblemDetail-module__k9Mj0W__downloadButton",
  "flagButton": "ProblemDetail-module__k9Mj0W__flagButton",
  "flagForm": "ProblemDetail-module__k9Mj0W__flagForm",
  "flagInput": "ProblemDetail-module__k9Mj0W__flagInput",
  "flagMessage": "ProblemDetail-module__k9Mj0W__flagMessage",
  "flagSection": "ProblemDetail-module__k9Mj0W__flagSection",
  "flagTitle": "ProblemDetail-module__k9Mj0W__flagTitle",
  "formGroup": "ProblemDetail-module__k9Mj0W__formGroup",
  "last": "ProblemDetail-module__k9Mj0W__last",
  "metaInfo": "ProblemDetail-module__k9Mj0W__metaInfo",
  "rankingBox": "ProblemDetail-module__k9Mj0W__rankingBox",
  "rankingItem": "ProblemDetail-module__k9Mj0W__rankingItem",
  "rankingList": "ProblemDetail-module__k9Mj0W__rankingList",
  "rankingSection": "ProblemDetail-module__k9Mj0W__rankingSection",
  "rankingTitle": "ProblemDetail-module__k9Mj0W__rankingTitle",
  "title": "ProblemDetail-module__k9Mj0W__title",
  "titleRow": "ProblemDetail-module__k9Mj0W__titleRow",
  "viewerContainer": "ProblemDetail-module__k9Mj0W__viewerContainer",
  "vmAddress": "ProblemDetail-module__k9Mj0W__vmAddress",
  "vmAddressWrapper": "ProblemDetail-module__k9Mj0W__vmAddressWrapper",
  "vmButton": "ProblemDetail-module__k9Mj0W__vmButton",
  "vmSection": "ProblemDetail-module__k9Mj0W__vmSection",
});
}}),
"[project]/src/app/game/[id]/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/game/[id]/ProblemDetail.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/token.ts [app-ssr] (ecmascript)"); // 최신 코드에서 제공한 함수 사용
'use client';
;
;
;
;
;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/wargame-problems";
const FILE_BASE_URL = API_BASE_URL.replace('/api/wargame-problems', '') || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";
const CTFProblemPage = ()=>{
    const { id: problemIdParam } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const problemId = problemIdParam || "6";
    const [problem, setProblem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [flag, setFlag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newComment, setNewComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [ranking, setRanking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [vmAddress, setVmAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [userNickname, setUserNickname] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchToken = async ()=>{
            const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
            if (!token) {
                alert("로그인이 필요한 서비스입니다.");
                router.push("/login");
            }
        };
        fetchToken();
    }, [
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchData = async ()=>{
            try {
                const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
                if (!token) throw new Error("Token is not available");
                const problemRes = await fetch(`${API_BASE_URL}/${problemId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const problemData = await problemRes.json();
                setProblem(problemData.result);
                const commentsRes = await fetch(`${FILE_BASE_URL}/api/comments/problem/${problemId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const commentsData = await commentsRes.json();
                setComments(commentsData.result);
                const rankingRes = await fetch(`${FILE_BASE_URL}/api/problems/${problemId}/firstblood?size=5`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const rankingData = await rankingRes.json();
                setRanking(rankingData.result);
                const nickname = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserNickname"])();
                setUserNickname(nickname);
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [
        problemId
    ]);
    const handleSubmit = async ()=>{
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
        if (!token) return;
        try {
            const res = await fetch(`${FILE_BASE_URL}/api/problems/${problemId}/solve?flag=${encodeURIComponent(flag)}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                setMessage("정답 확인 중 오류가 발생했습니다.");
                return;
            }
            const data = await res.json();
            setMessage(data.result ? "정답입니다! 축하합니다." : "오답입니다. 다시 시도하세요.");
        } catch (error) {
            console.error("정답 확인 실패:", error);
            setMessage("정답 확인 중 오류가 발생했습니다.");
        }
    };
    const handleShowVmAddress = async ()=>{
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
        if (!token) {
            alert("로그인 후 이용할 수 있습니다.");
            return;
        }
        try {
            const response = await fetch(`${FILE_BASE_URL}/api/pods/create?userId=${userNickname}&problemId=${problemId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("VM 주소 생성에 실패했습니다.");
            }
            const data = await response.json();
            setVmAddress(data.result || "VM 주소를 생성할 수 없습니다.");
        } catch (error) {
            console.error("VM 주소 생성 실패:", error);
            setVmAddress("VM 주소 생성 중 오류가 발생했습니다.");
        }
    };
    const handleFileDownload = async ()=>{
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
        if (!token) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }
        try {
            const response = await fetch(`${FILE_BASE_URL}/api/problems/${problem?.id}/download`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error("파일 다운로드 실패:", errorText);
                alert(`파일 다운로드 실패: ${response.status} ${response.statusText}`);
                return;
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = problem?.problemFile || "downloaded_file";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("파일 다운로드 중 문제가 발생했습니다:", error);
            alert("파일 다운로드 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };
    const handleCommentSubmit = async (e)=>{
        e.preventDefault();
        if (!newComment.trim()) return;
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
        if (!token) {
            alert("로그인 후 댓글을 작성할 수 있습니다.");
            return;
        }
        try {
            const res = await fetch(`${FILE_BASE_URL}/api/comments`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "PROBLEM",
                    problemId,
                    contents: newComment
                })
            });
            if (!res.ok) throw new Error("댓글 등록 실패");
            const data = await res.json();
            setComments([
                data.result,
                ...comments
            ]);
            setNewComment("");
        } catch (error) {
            console.error("댓글 등록 실패:", error);
        }
    };
    const handleCommentDelete = async (commentId)=>{
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
        if (!token) {
            setError('로그인이 필요합니다.');
            return;
        }
        try {
            const response = await fetch(`${FILE_BASE_URL}/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('댓글 삭제에 실패했습니다.');
            setComments((prev)=>prev.filter((comment)=>comment.id !== commentId));
        } catch (error) {
            setError(error instanceof Error ? error.message : '댓글 삭제 중 문제가 발생했습니다.');
        }
    };
    const handleCommentEditToggle = (commentId)=>{
        setComments((prev)=>prev.map((comment)=>comment.id === commentId ? {
                    ...comment,
                    isEditing: !comment.isEditing
                } : comment));
    };
    const handleCommentEdit = async (commentId, newContent)=>{
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
        if (!token) {
            setError('로그인이 필요합니다.');
            return;
        }
        try {
            const response = await fetch(`${FILE_BASE_URL}/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    type: 'PROBLEM',
                    contents: newContent
                })
            });
            if (response.status === 403) {
                throw new Error('권한이 없습니다.');
            }
            if (!response.ok) {
                throw new Error('댓글 수정에 실패했습니다.');
            }
            const updatedComment = await response.json();
            setComments((prev)=>prev.map((comment)=>comment.id === commentId ? {
                        ...comment,
                        content: updatedComment.contents,
                        isEditing: false
                    } : comment));
        } catch (error) {
            setError(error instanceof Error ? error.message : '댓글 수정 중 문제가 발생했습니다.');
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "문제를 불러오는 중입니다..."
    }, void 0, false, {
        fileName: "[project]/src/app/game/[id]/page.tsx",
        lineNumber: 309,
        columnNumber: 23
    }, this);
    if (!problem) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "문제를 찾을 수 없습니다."
    }, void 0, false, {
        fileName: "[project]/src/app/game/[id]/page.tsx",
        lineNumber: 311,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                    children: problem.title
                }, void 0, false, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 316,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metaInfo,
                    children: [
                        "출제자: ",
                        problem.creator,
                        " | 종류: ",
                        problem.kind
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 317,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metaInfo,
                    children: [
                        "출제일: ",
                        new Date(problem.createdAt).toLocaleDateString(),
                        " | 리뷰어: ",
                        problem.reviewer
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 320,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metaInfo} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].last}`,
                    children: [
                        "정답률: ",
                        problem.entireCount === 0 ? '제출 없음' : `${(problem.correctCount / problem.entireCount * 100).toFixed(2)}%`,
                        "(",
                        problem.correctCount,
                        "/",
                        problem.entireCount,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 323,
                    columnNumber: 7
                }, this),
                problem.tags?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metaInfo,
                    children: [
                        "태그: ",
                        problem.tags.join(', ')
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 329,
                    columnNumber: 9
                }, this),
                problem.source && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metaInfo,
                    children: [
                        "출처: ",
                        problem.source
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 335,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].viewerContainer,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        dangerouslySetInnerHTML: {
                            __html: problem.detail
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 341,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flagSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flagTitle,
                            children: "정답 제출"
                        }, void 0, false, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 347,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flagForm,
                            onSubmit: handleSubmit,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flagInput,
                                    value: flag,
                                    onChange: (e)=>setFlag(e.target.value),
                                    placeholder: "정답을 입력하세요"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 349,
                                    columnNumber: 11
                                }, this),
                                message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flagMessage,
                                    children: message
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flagButton,
                                    type: "submit",
                                    children: "제출"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 357,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 348,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 346,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buttonContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buttonBox,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].downloadButton,
                                onClick: handleFileDownload,
                                disabled: !problem?.problemFile,
                                children: "파일 다운로드"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/[id]/page.tsx",
                                lineNumber: 363,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 362,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buttonBox,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleShowVmAddress,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vmButton,
                                    children: "VM 주소 보기"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 372,
                                    columnNumber: 11
                                }, this),
                                vmAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vmAddress,
                                    children: vmAddress
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 375,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 371,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 361,
                    columnNumber: 7
                }, this),
                ranking && ranking.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rankingBox,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rankingTitle,
                            children: "🏆 랭킹"
                        }, void 0, false, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 381,
                            columnNumber: 5
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rankingList,
                            children: ranking.map((rank, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rankingItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rankNumber,
                                            children: index + 1
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/game/[id]/page.tsx",
                                            lineNumber: 385,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rankName,
                                            children: rank.nickname
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/game/[id]/page.tsx",
                                            lineNumber: 386,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rankTime,
                                            children: rank.firstBlood
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/game/[id]/page.tsx",
                                            lineNumber: 387,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, rank.id, true, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 384,
                                    columnNumber: 9
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 382,
                            columnNumber: 5
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 380,
                    columnNumber: 3
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rankingBox,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rankingTitle,
                            children: "🏆 랭킹"
                        }, void 0, false, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 394,
                            columnNumber: 5
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].noRanking,
                            children: "아직 문제를 푼 사람이 없습니다."
                        }, void 0, false, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 395,
                            columnNumber: 5
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 393,
                    columnNumber: 3
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].commentsSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].commentTitle,
                            children: "댓글"
                        }, void 0, false, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 400,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleCommentSubmit,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: newComment,
                                    onChange: (e)=>setNewComment(e.target.value),
                                    placeholder: "댓글을 입력하세요"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 402,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isSubmitting,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].btnPrimary,
                                    children: isSubmitting ? '등록 중...' : '등록'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 407,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 401,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            children: comments.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].commentItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: c.creator?.nickname || '익명 사용자'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/game/[id]/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/game/[id]/page.tsx",
                                            lineNumber: 414,
                                            columnNumber: 15
                                        }, this),
                                        c.isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: c.content,
                                            onChange: (e)=>setComments((prev)=>prev.map((comment)=>comment.id === c.id ? {
                                                            ...comment,
                                                            content: e.target.value
                                                        } : comment)),
                                            placeholder: "댓글을 수정하세요..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/game/[id]/page.tsx",
                                            lineNumber: 418,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].commentContent,
                                            children: c.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/game/[id]/page.tsx",
                                            lineNumber: 432,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].commentMeta,
                                            children: [
                                                "| ",
                                                new Date(c.createdAt).toLocaleDateString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/game/[id]/page.tsx",
                                            lineNumber: 434,
                                            columnNumber: 15
                                        }, this),
                                        c.creator?.nickname === userNickname && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    onClick: ()=>handleCommentEditToggle(c.id),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].commentEdit,
                                                    children: c.isEditing ? '저장' : '수정'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                                    lineNumber: 439,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    onClick: ()=>handleCommentDelete(c.id),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$game$2f5b$id$5d2f$ProblemDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].commentDelete,
                                                    children: "삭제"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 411,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/game/[id]/page.tsx",
                    lineNumber: 399,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/game/[id]/page.tsx",
            lineNumber: 315,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/game/[id]/page.tsx",
        lineNumber: 314,
        columnNumber: 3
    }, this);
};
const __TURBOPACK__default__export__ = CTFProblemPage;
}}),
"[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)");
}}),

};

//# sourceMappingURL=_ebf03a49._.js.map