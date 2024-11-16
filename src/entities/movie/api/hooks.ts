import { useQuery } from "@tanstack/react-query";
import { fetchTopRated } from "./movieApi";

export const useTopRated = (userId: number) => {
  return useQuery({
    queryKey: ["movie/topRated"],
    queryFn: () => fetchTopRated(userId),
  });
};
