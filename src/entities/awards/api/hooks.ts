import { useQuery } from "@tanstack/react-query";
import { fetchAwards, fetchPastAwards } from "./AwardsApi";

export const useAwards = (awardsId: number) => {
  return useQuery({
    queryKey: ["awards", awardsId],
    queryFn: () => fetchAwards(awardsId),
    enabled: awardsId >= 0,
  });
};

export const usePastAwards = () => {
  return useQuery({
    queryKey: ["awards", "past"],
    queryFn: () => fetchPastAwards(),
  });
};
