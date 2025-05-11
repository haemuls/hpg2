(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/notice/board.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "board-module__FJwxpW__active",
  "boardTable": "board-module__FJwxpW__boardTable",
  "btn": "board-module__FJwxpW__btn",
  "btnDark": "board-module__FJwxpW__btnDark",
  "btnLight": "board-module__FJwxpW__btnLight",
  "container": "board-module__FJwxpW__container",
  "cursorPointer": "board-module__FJwxpW__cursorPointer",
  "errorMessage": "board-module__FJwxpW__errorMessage",
  "loadingMessage": "board-module__FJwxpW__loadingMessage",
  "notice": "board-module__FJwxpW__notice",
  "pageNumber": "board-module__FJwxpW__pageNumber",
  "pageTitle": "board-module__FJwxpW__pageTitle",
  "pagination": "board-module__FJwxpW__pagination",
  "searchWindow": "board-module__FJwxpW__searchWindow",
  "searchWrap": "board-module__FJwxpW__searchWrap",
  "sortedAsc": "board-module__FJwxpW__sortedAsc",
  "sortedDesc": "board-module__FJwxpW__sortedDesc",
  "spin": "board-module__FJwxpW__spin",
  "spinner": "board-module__FJwxpW__spinner",
  "thAuthor": "board-module__FJwxpW__thAuthor",
  "thDate": "board-module__FJwxpW__thDate",
  "thNum": "board-module__FJwxpW__thNum",
  "thTitle": "board-module__FJwxpW__thTitle",
  "writeBtnWrap": "board-module__FJwxpW__writeBtnWrap",
});
}}),
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
"[project]/src/app/notice/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/notice/board.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/token.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";
const BoardPage = ()=>{
    _s();
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortByDateNewest, setSortByDateNewest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdmin, setIsAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const fetchPosts = async ()=>{
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${API_BASE_URL}/api/boards?type=ANNOUNCE&page=${currentPage}&size=25&sortByNewest=${sortByDateNewest}&search=${encodeURIComponent(searchTerm)}`, {
                headers: {
                    Authorization: `Bearer ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])()}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error("공지사항을 불러오는 데 실패했습니다.");
            }
            const data = await response.json();
            const formattedPosts = data.result.content.map((post)=>({
                    ...post,
                    id: Number(post.id),
                    formattedDate: new Date(post.lastModified).toLocaleDateString()
                }));
            setPosts(formattedPosts);
            setTotalPages(data.result.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : "공지사항을 불러오는 중 오류가 발생했습니다.");
        } finally{
            setLoading(false);
        }
    };
    const checkLoginStatus = ()=>{
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
        setIsLoggedIn(!!token);
        if (token) {
            const nickName = localStorage.getItem("nickName") || "";
            setIsAdmin(nickName === "관리자");
        }
    };
    const handleSearch = (e)=>{
        e.preventDefault();
        setCurrentPage(0);
        fetchPosts();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BoardPage.useEffect": ()=>{
            fetchPosts();
            checkLoginStatus();
        }
    }["BoardPage.useEffect"], [
        sortByDateNewest,
        currentPage,
        searchTerm
    ]);
    const toggleSortByDate = ()=>{
        setSortByDateNewest((prev)=>!prev);
        setCurrentPage(0);
    };
    const goToPage = (page)=>{
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };
    const handleWritePost = async ()=>{
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            router.push("/login");
            return;
        }
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
        try {
            const response = await fetch(`${API_BASE_URL}/token-validate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    jwtToken: token
                })
            });
            const data = await response.json();
            if (response.ok && data) {
                router.push("/board/write");
            } else {
                alert("토큰이 유효하지 않습니다.");
            }
        } catch (err) {
            alert("토큰 검증 중 오류가 발생했습니다.");
            console.error(err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notice,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageTitle,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "공지사항"
                    }, void 0, false, {
                        fileName: "[project]/src/app/notice/page.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/notice/page.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/notice/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "board-list",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingMessage,
                        children: "공지사항을 불러오는 중입니다..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/notice/page.tsx",
                        lineNumber: 153,
                        columnNumber: 13
                    }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingMessage,
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/notice/page.tsx",
                        lineNumber: 157,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boardTable,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "번호"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/notice/page.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thTitle,
                                                    children: "제목"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/notice/page.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thAuthor,
                                                    children: "작성자"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/notice/page.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    onClick: toggleSortByDate,
                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cursorPointer} ${sortByDateNewest ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sortedAsc : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sortedDesc}`,
                                                    children: "등록일"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/notice/page.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/notice/page.tsx",
                                            lineNumber: 162,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/notice/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: posts.length ? posts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: sortByDateNewest ? currentPage * 25 + index + 1 : totalPages * 25 - (currentPage * 25 + index)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/notice/page.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/board/view/${post.id}`,
                                                            children: post.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/notice/page.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/notice/page.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: post.creator
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/notice/page.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: post.formattedDate
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/notice/page.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, post.id, true, {
                                                fileName: "[project]/src/app/notice/page.tsx",
                                                lineNumber: 179,
                                                columnNumber: 23
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 4,
                                                children: "공지사항이 없습니다."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/notice/page.tsx",
                                                lineNumber: 197,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/notice/page.tsx",
                                            lineNumber: 196,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/notice/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/notice/page.tsx",
                                lineNumber: 160,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pagination,
                                children: Array.from({
                                    length: totalPages
                                }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageNumber} ${index === currentPage ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ""}`,
                                        onClick: ()=>goToPage(index),
                                        children: index + 1
                                    }, index, false, {
                                        fileName: "[project]/src/app/notice/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/notice/page.tsx",
                                lineNumber: 203,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/app/notice/page.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/notice/page.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "board-search",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchWindow,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSearch,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchWrap,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "search",
                                        placeholder: "제목으로 검색",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/notice/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnDark}`,
                                        children: "검색"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/notice/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/notice/page.tsx",
                                lineNumber: 225,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/notice/page.tsx",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/notice/page.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/notice/page.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/notice/page.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].writeBtnWrap,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$notice$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btn,
                        onClick: handleWritePost,
                        children: "공지사항 작성"
                    }, void 0, false, {
                        fileName: "[project]/src/app/notice/page.tsx",
                        lineNumber: 247,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/notice/page.tsx",
                    lineNumber: 246,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/notice/page.tsx",
                lineNumber: 245,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/notice/page.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
};
_s(BoardPage, "RGxZD18eMAWxN2F8Nqg4rqoBnxk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BoardPage;
const __TURBOPACK__default__export__ = BoardPage;
var _c;
__turbopack_context__.k.register(_c, "BoardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_5de955da._.js.map