import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "../App";

const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const MainPage = lazy(() => import("@/pages/main"));
const SearchPage = lazy(() => import("@/pages/search"));
const MovieDetailPage = lazy(() => import("@/pages/movie-detail"));
const PostListPage = lazy(() => import("@/pages/post-list"));
const PostDetailPage = lazy(() => import("@/pages/post-detail"));
const PostEditPage = lazy(() => import("@/pages/post-edit"));
const UserPage = lazy(() => import("@/pages/user"));
const AwardsPage = lazy(() => import("@/pages/awards"));
const AwardsHistoryPage = lazy(() => import("@/pages/awards-history"));
const AuthCodePage = lazy(() => import("@/pages/auth-code"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/post-list",
        element: <PostListPage />,
      },
      {
        path: "/post-edit",
        element: <PostEditPage />,
      },
      {
        path: "/post-edit/:postId",
        element: <PostEditPage />,
      },
      {
        path: "/post/:postId",
        element: <PostDetailPage />,
      },
      {
        path: "/movie/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "/user/:userId",
        element: <UserPage />,
      },
      {
        path: "/awards",
        element: <AwardsPage />,
      },
      {
        path: "/awards/history",
        element: <AwardsHistoryPage />,
      },
      {
        path: "/login/oauth/kakao",
        element: <AuthCodePage />,
      },
    ],
  },
]);

export default router;
