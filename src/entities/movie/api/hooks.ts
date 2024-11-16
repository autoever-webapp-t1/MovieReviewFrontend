import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchTopRated, rateMovie } from "./movieApi";
import { NewReviewDto } from "../model/types";

export const useTopRated = (userId: number) => {
  return useQuery({
    queryKey: ["movie/topRated"],
    queryFn: () => fetchTopRated(userId),
  });
};

export const useRateMovieForSignup = () => {
  // const queryClient = useQueryClient();

  return useMutation<
    string,
    any,
    { userId: number; movieId: number; newReview: NewReviewDto }
  >({
    mutationFn: ({ userId, movieId, newReview }) =>
      rateMovie(userId, movieId, newReview),
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["movie/topRated"],
      // });
    },
  });
};
