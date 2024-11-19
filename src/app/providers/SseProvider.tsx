import styles from "./SseProvider.module.css";
import { noAuthAxios, serverUrl } from "@/shared/api/base";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useModalStore } from "@/widgets/app-modal/model/store";
import { AwardsDto } from "@/entities/awards";

interface SseProviderProps {
  children: ReactNode;
}

export default function SseProvider({ children }: SseProviderProps) {
  const { pathname } = useLocation();
  const userId = sessionStorage.getItem("userId");
  const { setOpenModal } = useModalStore();

  const shouldCheckLogin = useMemo(() => {
    return !["/", "/login/oauth/kakao"].includes(pathname);
  }, [pathname]);

  const eventSource = useRef<EventSource>();

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldCheckLogin) {
      if (!userId) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/");
      } else {
        console.log("Try SSE Connection");
        eventSource.current = new EventSource(
          `${serverUrl}api/events/${userId}`
        );

        // eventSource.current.onopen = () => {
        //   console.log("SSE Connection Success");
        // };

        eventSource.current.addEventListener("connect", () => {
          console.log("SSE Connection Success");
        });

        eventSource.current.addEventListener("message", () => {
          setOpenModal("awardsModal", null);
        });

        eventSource.current.addEventListener(
          "AWARDS_NOTIFICATION",
          (event: MessageEvent<string>) => {
            const awardsDtoStr = event.data;
            const awardsDto: AwardsDto = JSON.parse(awardsDtoStr);

            console.log(awardsDto);
          }
        );

        eventSource.current.onerror = (e) => {
          console.log("SSE Connection Failed");
          console.log(e.target);
        };

        eventSource.current.onmessage = (ev) => {
          console.log(ev);
        };
      }
    }

    return () => {
      if (eventSource.current) {
        eventSource.current.close();
        eventSource.current = undefined;
      }
    };
  }, [userId]);

  const handleClick = useCallback(() => {
    noAuthAxios.post(`${serverUrl}api/notify`, {
      message: "asdf",
    });
  }, []);

  return (
    <>
      {children}
      <button className={styles.button} onClick={handleClick}>
        submit
      </button>
      <div className={styles.notification}></div>
    </>
  );
}
