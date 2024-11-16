import { useQuery } from "@tanstack/react-query";
import { fetchTopRated } from "./movieApi";

export const useTopRated = () => {
  return useQuery({
    queryKey: ["movie/topRated"],
    queryFn: fetchTopRated,
  });
};
