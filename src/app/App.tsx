import Header from "@/widgets/header";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { useMemo } from "react";

export default function App() {
  const { pathname } = useLocation();

  const hasHeader = useMemo(() => {
    return !["/", "/signup", "/login/oauth/kakao"].includes(pathname);
  }, [pathname]);

  if (hasHeader)
    return (
      <>
        <Header />
        <div className="content-container">
          <Outlet />
        </div>
      </>
    );
  else return <Outlet />;
}
