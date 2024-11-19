import Header from "@/widgets/header";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { useMemo } from "react";
import SseProvider from "./providers/SseProvider";
import AppModal from "@/widgets/app-modal";

export default function App() {
  const { pathname } = useLocation();

  const hasHeader = useMemo(() => {
    return !["/", "/signup", "/login/oauth/kakao"].includes(pathname);
  }, [pathname]);

  if (hasHeader)
    return (
      <>
        <AppModal>
          <SseProvider>
            <Header />
            <div className="content-container">
              <Outlet />
            </div>
          </SseProvider>
        </AppModal>
      </>
    );
  else
    return (
      <AppModal>
        <Outlet />
      </AppModal>
    );
}
