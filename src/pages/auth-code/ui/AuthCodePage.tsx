import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as loginApi, postLogin } from "@features/login";
import { useUserStore } from "@/entities/user";

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

    navigate("/main");
  };

  useEffect(() => {
    login();
  }, []);
  return <></>;
}
