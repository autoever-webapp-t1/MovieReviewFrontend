import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchMovie,
  fetchNowPlaying,
  fetchPopular,
  fetchReview,
  fetchRecommendations,
  fetchTopRated,
  fetchUpComing,
  rateMovie,
  updateReview,
  searchMovie,
  fetchMyMovie,
  fetchRelated,
} from "./movieApi";
import { NewReviewDto, ReviewDetailDto } from "../model/types";

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

export const useMyMovie = () => {
  return useQuery({
    queryKey: ["movie/myMovie"],
    queryFn: () => fetchMyMovie(),
  });
};

export const useRelated = (movieId: number) => {
  return useQuery({
    queryKey: ["movie/related", movieId],
    queryFn: () => fetchRelated(movieId),
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
      return lastPage.current + 1 <= lastPage.totalPage
        ? lastPage.current + 1
        : undefined;
    },
  });
};

export const useRecommendations = () => {
  return useQuery({
    queryKey: ["movie/recommendations"],
    queryFn: () => fetchRecommendations(),
  });
};

export const useRateMovieForSignup = () => {
  return useMutation<string, any, { movieId: number; newReview: NewReviewDto }>(
    {
      mutationFn: ({ movieId, newReview }) => rateMovie(movieId, newReview),
    }
  );
};

export const useUpdateReview = () => {
  return useMutation<string, any, { movieId: number; review: ReviewDetailDto }>(
    {
      mutationFn: ({ movieId, review }) => updateReview(movieId, review),
    }
  );
};

export const useInfiniteSearchMovies = (keyword: string, size: number) => {
  return useInfiniteQuery({
    queryKey: ["movies", keyword, size],
    queryFn: ({ pageParam }) => searchMovie(keyword, pageParam, size),
    enabled: !!keyword,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.nextPage : undefined;
    },
    staleTime: 1000 * 60,
  });
};
