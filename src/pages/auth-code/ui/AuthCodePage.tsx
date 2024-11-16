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
    localStorage.setItem("at", accessToken);
    localStorage.setItem("rt", refreshToken);

    const userInfo = await postLogin(accessToken, refreshToken);
    setUser(userInfo);

    if (false) {
      // if (userInfo.existed) {
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
