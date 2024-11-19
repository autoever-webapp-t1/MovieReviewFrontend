import Header from "@/widgets/header";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { useMemo } from "react";
import SseProvider from "./providers/SseProvider";

export default function App() {
  const { pathname } = useLocation();

  const hasHeader = useMemo(() => {
    return !["/", "/signup", "/login/oauth/kakao"].includes(pathname);
  }, [pathname]);

  if (hasHeader)
    return (
      <>
        <SseProvider>
          <Header />
          <div className="content-container">
            <Outlet />
          </div>
        </SseProvider>
      </>
    );
  else return <Outlet />;
}
