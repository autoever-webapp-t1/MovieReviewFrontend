import { useQuery } from "@tanstack/react-query";
import { fetchPastAwards } from "./AwardsApi";

export const usePastAwards = () => {
  return useQuery({
    queryKey: ["awards", "past"],
    queryFn: () => fetchPastAwards(),
  });
};
