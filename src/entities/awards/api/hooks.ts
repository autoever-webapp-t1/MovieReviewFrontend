import { useQuery } from "@tanstack/react-query";
import { fetchAwards, fetchPastAwards } from "./AwardsApi";

export const useAwards = () => {
  return useQuery({
    queryKey: ["awards"],
    queryFn: () => fetchAwards(),
  });
};

export const usePastAwards = () => {
  return useQuery({
    queryKey: ["awards", "past"],
    queryFn: () => fetchPastAwards(),
  });
};
