(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/token.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearTokens": (()=>clearTokens),
    "getAccessToken": (()=>getAccessToken),
    "getMembershipId": (()=>getMembershipId),
    "getRefreshToken": (()=>getRefreshToken),
    "getUserInfo": (()=>getUserInfo),
    "getValidAccessToken": (()=>getValidAccessToken),
    "login": (()=>login),
    "refreshAccessToken": (()=>refreshAccessToken),
    "setAxiosDefaults": (()=>setAxiosDefaults),
    "setTokens": (()=>setTokens),
    "validateToken": (()=>validateToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
// API URLs
const BASE_URL = 'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com'; // api 기본주소
const LOGIN_URL = `${BASE_URL}/login`; // 로그인 요청 url
const TOKEN_VALIDATE_URL = `${BASE_URL}/token-validate`; // 토큰 검증 요청 url
const TOKEN_REFRESH_URL = `${BASE_URL}/reissue`; // 엑세스 토큰 갱신
const USER_INFO_URL = `${BASE_URL}/api/users`; // 사용자 정보 가져오는 api
const login = async (account, password)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(LOGIN_URL, {
            account,
            password
        });
        const { jwtToken, refreshToken, nickName, membershipId } = response.data; // 서버 응답에서 jwtToken, refreshToken, nickName, membershipId 추출
        setTokens(jwtToken, refreshToken); // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('nickname', nickName);
        localStorage.setItem('membershipId', membershipId);
        setAxiosDefaults();
        return response.data;
    } catch (error) {
        console.error('로그인 실패:', error);
        throw error;
    }
};
const validateToken = async (accessToken)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(TOKEN_VALIDATE_URL, {
            jwtToken: accessToken
        });
        return response.data === true;
    } catch (error) {
        console.error('토큰 검증 실패:', error);
        return false;
    }
};
const refreshAccessToken = async (membershipId, accessToken, refreshToken)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(TOKEN_REFRESH_URL, {
            membershipId,
            jwtToken: accessToken,
            refreshToken
        });
        const { jwtToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
        setTokens(newAccessToken, newRefreshToken); // 갱신된 refreshToken도 로컬 스토리지에 저장
        return newAccessToken;
    } catch (error) {
        console.error('토큰 갱신 실패:', error);
        clearTokens();
        return null;
    }
};
const getUserInfo = async ()=>{
    try {
        const membershipId = localStorage.getItem('membershipId');
        if (!membershipId) {
            throw new Error('Membership ID not available');
        }
        const accessToken = await getValidAccessToken();
        if (!accessToken) {
            throw new Error('Access token not available');
        }
        // API 요청 보내기
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${USER_INFO_URL}/${membershipId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};
const setTokens = (accessToken, refreshToken)=>{
    localStorage.setItem('jwtToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};
const getAccessToken = ()=>localStorage.getItem('jwtToken');
const getRefreshToken = ()=>localStorage.getItem('refreshToken');
const getMembershipId = ()=>localStorage.getItem('membershipId');
const clearTokens = ()=>{
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('membershipId');
};
const getValidAccessToken = async ()=>{
    const accessToken = getAccessToken(); // jwtToken을 accessToken으로 대체
    if (!accessToken) {
        return null;
    }
    const isValid = await validateToken(accessToken); // accessToken으로 유효성 검사
    if (!isValid) {
        const refreshToken = getRefreshToken();
        const membershipId = getMembershipId();
        if (refreshToken && membershipId) {
            const newAccessToken = await refreshAccessToken(membershipId, accessToken, refreshToken); // 새로운 accessToken으로 갱신
            return newAccessToken;
        }
        return null;
    }
    return accessToken; // 유효한 accessToken 반환
};
const setAxiosDefaults = ()=>{
    const accessToken = getAccessToken();
    if (accessToken) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/game/[id]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/token.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/wargame-problems";
const FILE_BASE_URL = API_BASE_URL.replace('/api/wargame-problems', '') || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";
const CTFProblemPage = ()=>{
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const problemId = Array.isArray(params?.id) ? params.id[0] : params?.id || "6";
    const [problem, setProblem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [flag, setFlag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newComment, setNewComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [ranking, setRanking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [vmAddress, setVmAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isTokenLoaded, setIsTokenLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CTFProblemPage.useEffect": ()=>{
            const storedToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
            setToken(storedToken);
            setIsTokenLoaded(true); // 토큰 로딩 완료
        }
    }["CTFProblemPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CTFProblemPage.useEffect": ()=>{
            if (!isTokenLoaded) return; // 토큰 로딩 완료 전에는 실행하지 않음
            if (!token) {
                alert("로그인이 필요한 서비스입니다.");
                router.push("/login"); // 로그인 페이지로 리다이렉트
                return;
            }
            const fetchProblem = {
                "CTFProblemPage.useEffect.fetchProblem": async ()=>{
                    try {
                        const res = await fetch(`${API_BASE_URL}/${problemId}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Accept': '*/*'
                            }
                        });
                        if (!res.ok) {
                            throw new Error(`문제 API 호출 실패: ${res.status} ${res.statusText}`);
                        }
                        const data = await res.json();
                        setProblem(data.result);
                    } catch (error) {
                        console.error("문제 가져오기 실패:", error);
                    }
                }
            }["CTFProblemPage.useEffect.fetchProblem"];
            const fetchComments = {
                "CTFProblemPage.useEffect.fetchComments": async ()=>{
                    try {
                        const res = await fetch(`${FILE_BASE_URL}/api/problems/${problemId}/comments`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Accept': '*/*'
                            }
                        });
                        if (!res.ok) {
                            throw new Error(`댓글 API 호출 실패: ${res.status} ${res.statusText}`);
                        }
                        const data = await res.json();
                        setComments(data.result);
                    } catch (error) {
                        console.error("댓글 가져오기 실패:", error);
                    }
                }
            }["CTFProblemPage.useEffect.fetchComments"];
            const fetchRanking = {
                "CTFProblemPage.useEffect.fetchRanking": async ()=>{
                    try {
                        const res = await fetch(`${FILE_BASE_URL}/api/problems/${problemId}/firstblood?size=5`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Accept': '*/*'
                            }
                        });
                        if (!res.ok) {
                            throw new Error(`랭킹 API 호출 실패: ${res.status} ${res.statusText}`);
                        }
                        const data = await res.json();
                        // result가 배열이 아니면 객체로 반환됨
                        if (Array.isArray(data.result)) {
                            setRanking(data.result);
                        } else {
                            setRanking([
                                data.result
                            ]); // 객체를 배열로 감싸서 상태에 저장
                        }
                    } catch (error) {
                        console.error("랭킹 조회 실패:", error);
                    }
                }
            }["CTFProblemPage.useEffect.fetchRanking"];
            fetchProblem();
            fetchComments();
            fetchRanking();
        }
    }["CTFProblemPage.useEffect"], [
        problemId,
        token,
        isTokenLoaded
    ]);
    const handleSubmit = async ()=>{
        if (!token) return;
        try {
            const url = `${FILE_BASE_URL}/api/problems/${problemId}/solve?flag=${encodeURIComponent(flag)}`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "*/*"
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
    const handleAddComment = async ()=>{
        if (newComment.trim() === "") return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/problems/${problemId}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: newComment
                })
            });
            if (!res.ok) {
                throw new Error(`댓글 작성 실패: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            setComments((prevComments)=>[
                    ...prevComments,
                    data.result
                ]);
            setNewComment(""); // 댓글 작성 후 입력값 초기화
        } catch (error) {
            console.error("댓글 작성 실패:", error);
        }
    };
    const handleShowVmAddress = ()=>{
        setVmAddress(problem?.dockerfileLink || "VM 주소가 제공되지 않았습니다.");
    };
    if (!problem) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "로딩 중..."
    }, void 0, false, {
        fileName: "[project]/src/app/game/[id]/page.tsx",
        lineNumber: 198,
        columnNumber: 24
    }, this);
    const formatTime = (timeString)=>{
        const date = new Date(timeString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: [
                            problem.title,
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '0.5em'
                                },
                                children: [
                                    "made by ",
                                    problem.creator
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/game/[id]/page.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Level: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "gold"
                                },
                                children: '⭐'.repeat(problem.level)
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/[id]/page.tsx",
                                lineNumber: 221,
                                columnNumber: 18
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    problem.problemFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "문제 파일:",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `${FILE_BASE_URL}/${problemId}/download`,
                                download: true,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                style: {
                                    color: "blue",
                                    textDecoration: "underline"
                                },
                                children: "다운로드"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/[id]/page.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "문제 파일 없음"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: problem.content
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "플래그를 입력하세요",
                        value: flag,
                        onChange: (e)=>setFlag(e.target.value),
                        className: "input"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        className: "button",
                        children: "제출"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "message",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 250,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/[id]/page.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ranking-box",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "랭킹"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    ranking.length > 0 ? ranking.map((user, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ranking-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rank",
                                    children: index === 0 ? "👑" : index + 1
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "username",
                                    children: user.nickname
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "solved-time",
                                    children: formatTime(user.created)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/game/[id]/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/src/app/game/[id]/page.tsx",
                            lineNumber: 257,
                            columnNumber: 13
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "아직 풀이한 사용자가 없습니다."
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 266,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/[id]/page.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "VM 주소"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleShowVmAddress,
                        className: "button vm-button",
                        children: "VM 주소 보기"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    vmAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "vm-address",
                        children: vmAddress
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 275,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/[id]/page.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "댓글"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        className: "textarea",
                        placeholder: "댓글을 작성하세요",
                        value: newComment,
                        onChange: (e)=>setNewComment(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleAddComment,
                        className: "button comment-button",
                        children: "댓글 작성"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "comment-list",
                        children: comments.map((comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "comment-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: comment.creator?.nickname || "익명"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/game/[id]/page.tsx",
                                                lineNumber: 292,
                                                columnNumber: 18
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: formatTime(comment.createdAt)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/game/[id]/page.tsx",
                                                lineNumber: 292,
                                                columnNumber: 71
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/game/[id]/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: comment.content
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/game/[id]/page.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, comment.id, true, {
                                fileName: "[project]/src/app/game/[id]/page.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/[id]/page.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/[id]/page.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/game/[id]/page.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
};
_s(CTFProblemPage, "O7FX7uN7Z4tkIu4ayWb5Jx1gxME=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CTFProblemPage;
const __TURBOPACK__default__export__ = CTFProblemPage;
var _c;
__turbopack_context__.k.register(_c, "CTFProblemPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_52cce916._.js.map