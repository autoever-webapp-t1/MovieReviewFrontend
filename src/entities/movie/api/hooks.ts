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

export const useTopRated = () => {
  return useQuery({
    queryKey: ["movie/topRated"],
    queryFn: () => fetchTopRated(),
  });
};

export const useNowPlaing = () => {
  return useQuery({
    queryKey: ["movie/nowPlaying"],
    queryFn: () => fetchNowPlaying(),
  });
};

export const useUpComing = () => {
  return useQuery({
    queryKey: ["movie/upComing"],
    queryFn: () => fetchUpComing(),
  });
};

export const usePopular = () => {
  return useQuery({
    queryKey: ["movie/popular"],
    queryFn: () => fetchPopular(),
  });
};

export const useMovie = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovie(movieId),
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
  return useMutation<string, any, { movieId: number; newReview: NewReviewDto }>(
    {
      mutationFn: ({ movieId, newReview }) => rateMovie(movieId, newReview),
    }
  );
};
