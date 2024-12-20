import { authAxios } from "@/shared/api/base";
import {
  MovieCardDto,
  MovieWithReviewsDto,
  NewReviewDto,
  ReviewDetailDto,
  MovieSearchResponse,
  MovieRecommendationDto,
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

export const fetchMovie = async (movieId: number) => {
  const response = await authAxios.get<MovieWithReviewsDto>(
    `api/movie/${movieId}`
  );

  return response.data;
};

export const fetchReview = async (pageParam: number, movieId: number) => {
  const response = await authAxios.get<PageResponseDto<ReviewDetailDto>>(
    `api/movie/${movieId}/review?page=${pageParam}&size=10`
  );

  return response.data;
};

export const fetchRecommendations = async () => {
  const response = await authAxios.get<MovieRecommendationDto>(
    `api/movie/recommendations`
  );

  return response.data;
};

export const fetchMyMovie = async () => {
  const response = await authAxios.get<MovieCardDto[]>(
    `api/member/movie-cards`
  );

  return response.data;
};

export const fetchRelated = async (movieId: number) => {
  const response = await authAxios.get<MovieCardDto[]>(
    `api/movie/relatedContents/${movieId}`
  );

  return response.data;
};

export const rateMovie = async (movieId: number, newReview: NewReviewDto) => {
  const response = await authAxios.post<string, AxiosResponse, NewReviewDto>(
    `api/movie/${movieId}/review`,
    newReview
  );

  return response.data;
};

export const updateReview = async (
  movieId: number,
  review: ReviewDetailDto
) => {
  const response = await authAxios.put(
    `api/movie/${movieId}/review/${review.reviewId}`,
    review
  );

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
