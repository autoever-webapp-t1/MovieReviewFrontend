import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchNowPlaying,
  fetchPopular,
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

export const useRateMovieForSignup = () => {
  return useMutation<string, any, { movieId: number; newReview: NewReviewDto }>(
    {
      mutationFn: ({ movieId, newReview }) => rateMovie(movieId, newReview),
    }
  );
};
