import axios from "axios";
import { useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export default function AuthCodePage() {
  const params = useLocation();

  console.log(params.search.substring(6));

  const login = async () => {
    const response = await axios.get(
      `http://localhost:8080/login/oauth/kakao?code=${params.search.substring(
        6
      )}`,
      { withCredentials: true }
    );

    console.log(response);
  };

  useEffect(() => {
    login();
  }, []);
  return <></>;
}
