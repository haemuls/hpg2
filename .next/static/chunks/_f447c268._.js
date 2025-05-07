(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/board/board.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "board-module__Ar4M1q__active",
  "boardTable": "board-module__Ar4M1q__boardTable",
  "btn": "board-module__Ar4M1q__btn",
  "btnDark": "board-module__Ar4M1q__btnDark",
  "btnLight": "board-module__Ar4M1q__btnLight",
  "container": "board-module__Ar4M1q__container",
  "cursorPointer": "board-module__Ar4M1q__cursorPointer",
  "errorMessage": "board-module__Ar4M1q__errorMessage",
  "loadingMessage": "board-module__Ar4M1q__loadingMessage",
  "notice": "board-module__Ar4M1q__notice",
  "pageNumber": "board-module__Ar4M1q__pageNumber",
  "pageTitle": "board-module__Ar4M1q__pageTitle",
  "pagination": "board-module__Ar4M1q__pagination",
  "searchWindow": "board-module__Ar4M1q__searchWindow",
  "searchWrap": "board-module__Ar4M1q__searchWrap",
  "sortedAsc": "board-module__Ar4M1q__sortedAsc",
  "sortedDesc": "board-module__Ar4M1q__sortedDesc",
  "spin": "board-module__Ar4M1q__spin",
  "spinner": "board-module__Ar4M1q__spinner",
  "thAuthor": "board-module__Ar4M1q__thAuthor",
  "thDate": "board-module__Ar4M1q__thDate",
  "thNum": "board-module__Ar4M1q__thNum",
  "thTitle": "board-module__Ar4M1q__thTitle",
  "writeBtnWrap": "board-module__Ar4M1q__writeBtnWrap",
});
}}),
"[project]/src/app/board/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/board/board.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/token.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL || "https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com";
const PAGE_SIZE = 25;
const BoardPage = ()=>{
    _s();
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortByDateNewest, setSortByDateNewest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalElements, setTotalElements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const maxPageButtons = 5;
    const pageGroupStart = Math.floor(currentPage / maxPageButtons) * maxPageButtons;
    const pageGroupEnd = Math.min(pageGroupStart + maxPageButtons, totalPages);
    const fetchPosts = async ()=>{
        setLoading(true);
        setError("");
        try {
            const endpoint = searchTerm ? `${API_BASE_URL}/api/boards/search?type=FREE&keyword=${encodeURIComponent(searchTerm)}&page=${currentPage}&size=${PAGE_SIZE}` : `${API_BASE_URL}/api/boards?type=FREE&page=${currentPage}&size=${PAGE_SIZE}&sortByNewest=${sortByDateNewest}`;
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])()}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error("게시글을 불러오는 데 실패했습니다.");
            }
            const data = await response.json();
            const formattedPosts = data.result.content.map((post)=>({
                    ...post,
                    formattedDate: new Date(post.lastModified).toLocaleDateString()
                }));
            setPosts(formattedPosts);
            setTotalPages(data.result.totalPages);
            setTotalElements(data.result.totalElements);
        } catch (err) {
            setError(err instanceof Error ? err.message : "게시글을 불러오는 중 오류가 발생했습니다.");
        } finally{
            setLoading(false);
        }
    };
    const checkLoginStatus = async ()=>{
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
        setIsLoggedIn(!!token);
    };
    const handleSearch = (e)=>{
        e.preventDefault();
        setCurrentPage(0);
        fetchPosts();
    };
    const toggleSortByDate = ()=>{
        setSortByDateNewest((prev)=>!prev);
        setCurrentPage(0);
    };
    const goToPage = (page)=>{
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
            fetchPosts();
        } else {
            alert("유효하지 않은 페이지입니다.");
        }
    };
    const handleWritePost = async ()=>{
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            router.push("/login");
            return;
        }
        router.push("/board/write");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BoardPage.useEffect": ()=>{
            fetchPosts();
            checkLoginStatus();
        }
    }["BoardPage.useEffect"], [
        sortByDateNewest,
        currentPage
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notice,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageTitle,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "자유 게시판"
                    }, void 0, false, {
                        fileName: "[project]/src/app/board/page.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/board/page.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/board/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "board-list",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingMessage,
                        children: "게시글을 불러오는 중입니다..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/board/page.tsx",
                        lineNumber: 138,
                        columnNumber: 13
                    }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingMessage,
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/board/page.tsx",
                        lineNumber: 142,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boardTable,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "번호"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/board/page.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thTitle,
                                                    children: "제목"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/board/page.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thAuthor,
                                                    children: "작성자"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/board/page.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    onClick: toggleSortByDate,
                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cursorPointer} ${sortByDateNewest ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sortedAsc : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sortedDesc}`,
                                                    children: "등록일"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/board/page.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/board/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/board/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: posts.length ? posts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: sortByDateNewest ? totalElements - (currentPage * PAGE_SIZE + index) : currentPage * PAGE_SIZE + index + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/board/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/board/view/${post.id}`,
                                                            children: post.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/board/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/board/page.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: post.creator
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/board/page.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: post.formattedDate
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/board/page.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, post.id, true, {
                                                fileName: "[project]/src/app/board/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 23
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 4,
                                                children: "게시글이 없습니다."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/board/page.tsx",
                                                lineNumber: 181,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/board/page.tsx",
                                            lineNumber: 180,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/board/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/board/page.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pagination,
                                children: [
                                    currentPage > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageNumber,
                                        onClick: ()=>goToPage(0),
                                        children: "<<"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/board/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 19
                                    }, this),
                                    currentPage > maxPageButtons - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageNumber,
                                        onClick: ()=>goToPage(currentPage - maxPageButtons),
                                        children: "<"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/board/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 19
                                    }, this),
                                    Array.from({
                                        length: pageGroupEnd - pageGroupStart
                                    }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageNumber} ${currentPage === pageGroupStart + index ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ""}`,
                                            onClick: ()=>goToPage(pageGroupStart + index),
                                            children: pageGroupStart + index + 1
                                        }, pageGroupStart + index, false, {
                                            fileName: "[project]/src/app/board/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this)),
                                    currentPage < totalPages - maxPageButtons && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageNumber,
                                        onClick: ()=>goToPage(currentPage + maxPageButtons),
                                        children: ">"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/board/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 19
                                    }, this),
                                    currentPage < totalPages - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageNumber,
                                        onClick: ()=>goToPage(totalPages - 1),
                                        children: ">>"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/board/page.tsx",
                                        lineNumber: 228,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/board/page.tsx",
                                lineNumber: 187,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/app/board/page.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/board/page.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "board-search",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchWindow,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSearch,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchWrap,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "search",
                                        placeholder: "제목으로 검색",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/board/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnDark}`,
                                        children: "검색"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/board/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/board/page.tsx",
                                lineNumber: 245,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/board/page.tsx",
                            lineNumber: 244,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/board/page.tsx",
                        lineNumber: 243,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/board/page.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/board/page.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].writeBtnWrap,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$board$2f$board$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btn,
                        onClick: handleWritePost,
                        children: "글작성"
                    }, void 0, false, {
                        fileName: "[project]/src/app/board/page.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/board/page.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/board/page.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/board/page.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
};
_s(BoardPage, "kKfVwZ2pRB4iKbEj0IzhK0EkUfE=", false, function() {
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
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_f447c268._.js.map