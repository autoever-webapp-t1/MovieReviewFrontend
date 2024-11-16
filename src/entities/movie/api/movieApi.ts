import { authAxios } from "@/shared/api/base";
import { MovieCardDto, NewReviewDto } from "../model/types";
import { AxiosResponse } from "axios";

export const fetchTopRated = async (userId: number) => {
  const at = localStorage.getItem("at");
  if (!at) throw new Error();

  const response = await authAxios.get<MovieCardDto[]>(
    `api/movie/topRated/${userId}`
  );

  return response.data;
};

export const rateMovie = async (
  userId: number,
  movieId: number,
  newReview: NewReviewDto
) => {
  const at = localStorage.getItem("at");
  if (!at) throw new Error();

  const response = await authAxios.post<string, AxiosResponse, NewReviewDto>(
    `api/movie/${movieId}/review?memberId=${userId}`,
    newReview
  );

  console.log(response);

  return response.data;
};
