import { authAxios } from "@/shared/api/base";
import {
  MovieCardDto,
  MovieDetailDto,
  NewReviewDto,
  ReviewDetailDto,
} from "../model/types";
import { AxiosResponse } from "axios";
import { PageResponseDto } from "@/shared/model/types";

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

export const fetchMovie = async (movieId: number, userId: number) => {
  const response = await authAxios.get<MovieDetailDto>(
    `api/movie/${movieId}/${userId}`
  );

  return response.data;
};

export const fetchReview = async (pageParam: number, movieId: number) => {
  const response = await authAxios.get<PageResponseDto<ReviewDetailDto>>(
    `api/movie/${movieId}/review?page=${pageParam}&size=10`
  );

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
