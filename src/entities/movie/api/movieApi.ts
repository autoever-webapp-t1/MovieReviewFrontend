import { authAxios } from "@/shared/api/base";
import { MovieCardDto, NewReviewDto } from "../model/types";
import { AxiosResponse } from "axios";

export const fetchTopRated = async () => {
  const response = await authAxios.get<MovieCardDto[]>(`api/movie/topRated`);

  return response.data;
};

export const fetchNowPlaying = async () => {
  const response = await authAxios.get<MovieCardDto[]>(`api/movie/nowPlaying`);

  return response.data;
};

export const fetchUpComing = async () => {
  const response = await authAxios.get<MovieCardDto[]>(`api/movie/upComing`);

  return response.data;
};

export const fetchPopular = async () => {
  const response = await authAxios.get<MovieCardDto[]>(`api/movie/popular`);

  return response.data;
};

export const rateMovie = async (movieId: number, newReview: NewReviewDto) => {
  const response = await authAxios.post<string, AxiosResponse, NewReviewDto>(
    `api/movie/${movieId}/review`,
    newReview
  );

  console.log(response);

  return response.data;
};
