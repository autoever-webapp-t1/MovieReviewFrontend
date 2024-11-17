import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://api.gasanne.site:8080/",
});

authAxios.interceptors.request.use((config) => {
  const at = localStorage.getItem("at") || "";

  config.headers.setAuthorization(`Bearer ${at}`);

  return config;
});

const noAuthAxios = axios.create({
  baseURL: "http://api.gasanne.site:8080/",
});

export { authAxios, noAuthAxios };
