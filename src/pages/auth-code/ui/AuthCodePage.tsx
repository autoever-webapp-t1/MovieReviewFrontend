import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as loginApi, postLogin } from "@features/login";
import { useUserStore } from "@/entities/user";
import SplashBackground from "@/widgets/splash-background";
import Spinner from "@/widgets/spinner";

export default function AuthCodePage() {
  const params = useLocation();
  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);

  const login = async () => {
    const loginResponse = await loginApi(params.search.substring(6));
    const { accessToken, refreshToken } = loginResponse;

    const userInfo = await postLogin(accessToken, refreshToken);

    sessionStorage.setItem("userId", String(userInfo.member.memberId));
    sessionStorage.setItem("userProfile", String(userInfo.member.profile));
    sessionStorage.setItem("userNickname", String(userInfo.member.nickname));
    sessionStorage.setItem("userEmail", String(userInfo.member.email));
    sessionStorage.setItem("awardsId", String(userInfo.award.awardsId));
    sessionStorage.setItem("awardsName", userInfo.award.awardName);
    sessionStorage.setItem("startDateTime", userInfo.award.startDateTime);
    sessionStorage.setItem("endDateTime", userInfo.award.endDateTime);
    sessionStorage.setItem("nextAwardName", userInfo.award.nextAwardName);

    setUser(userInfo);
    localStorage.setItem("at", userInfo.jwtToken);

    if (userInfo.member.existed) {
      navigate("/main");
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    login();
  }, []);
  return (
    <SplashBackground>
      <Spinner />
    </SplashBackground>
  );
}
