import { authAxios } from "@/shared/api/base";
import {
  MovieCardDto,
  MovieSearchResponse,
  NewReviewDto,
} from "../model/types";
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

export const searchMovie = async (
  keyword: string,
  page: number,
  size: number
) => {
  console.log(`api/movie/search/${keyword}?page=${page}&size=${size}`);
  const response = await authAxios.get<MovieSearchResponse>(
    `api/movie/search/${keyword}`,
    { params: { page, size } }
  );
  console.log(response);
  return response.data;
};
