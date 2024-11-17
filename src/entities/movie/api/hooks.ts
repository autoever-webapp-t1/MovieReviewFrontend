import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchMovie,
  fetchNowPlaying,
  fetchPopular,
  fetchReview,
  fetchTopRated,
  fetchUpComing,
  rateMovie,
} from "./movieApi";
import { NewReviewDto } from "../model/types";

export const useTopRated = (userId: number) => {
  return useQuery({
    queryKey: ["movie/topRated"],
    queryFn: () => fetchTopRated(userId),
  });
};

export const useNowPlaing = (userId: number) => {
  return useQuery({
    queryKey: ["movie/nowPlaying"],
    queryFn: () => fetchNowPlaying(userId),
  });
};

export const useUpComing = (userId: number) => {
  return useQuery({
    queryKey: ["movie/upComing"],
    queryFn: () => fetchUpComing(userId),
  });
};

export const usePopular = (userId: number) => {
  return useQuery({
    queryKey: ["movie/popular"],
    queryFn: () => fetchPopular(userId),
  });
};

export const useMovie = (movieId: number, userId: number) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovie(movieId, userId),
  });
};

export const useReview = (movieId: number) => {
  return useInfiniteQuery({
    queryKey: ["movie", movieId, "review"],
    queryFn: ({ pageParam }) => fetchReview(pageParam, movieId),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current + 1 < lastPage.totalPage
        ? lastPage.current + 1
        : undefined;
    },
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
