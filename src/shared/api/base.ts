import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.gasanne.site:8080/api/",
});

export { instance as axios };
