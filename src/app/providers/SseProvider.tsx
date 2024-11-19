import { serverUrl } from "@/shared/api/base";
import { ReactNode, useEffect, useMemo, useRef } from "react";
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
            console.log(awardsDtoStr);
            const { message }: { message: string } = JSON.parse(awardsDtoStr);
            const awardsDto: AwardsDto = JSON.parse(message);

            setOpenModal("awardsModal", null);

            sessionStorage.setItem("awardsId", String(awardsDto.awardsId));
            sessionStorage.setItem("awardsName", awardsDto.awardName);
            sessionStorage.setItem(
              "nominated1Id",
              String(awardsDto.nominated1)
            );
            sessionStorage.setItem(
              "nominated2Id",
              String(awardsDto.nominated2)
            );
            sessionStorage.setItem(
              "nominated3Id",
              String(awardsDto.nominated3)
            );
            sessionStorage.setItem(
              "nominated4Id",
              String(awardsDto.nominated4)
            );
            sessionStorage.setItem("startDateTime", awardsDto.startDateTime);
            sessionStorage.setItem("endDateTime", awardsDto.endDateTime);
          }
        );

        eventSource.current.onerror = () => {
          console.log("SSE Connection Failed");
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

  return <>{children}</>;
}
