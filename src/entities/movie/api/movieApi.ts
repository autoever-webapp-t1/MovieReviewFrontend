import { axios } from "@/shared/api/base";
import { MovieCardDto } from "../model/types";

export const fetchTopRated = async () => {
  const at = localStorage.getItem("at");
  if (!at) throw new Error();

  const response = await axios.get<MovieCardDto[]>(`api/movie/topRated`, {
    headers: { Authorization: `Bearer ${at}` },
  });

  return response.data;
};
