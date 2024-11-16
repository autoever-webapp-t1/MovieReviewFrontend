import { axios } from "@/shared/api/base";
import { MovieCardDto, NewReviewDto } from "../model/types";
import { AxiosResponse } from "axios";

export const fetchTopRated = async (userId: number) => {
  const at = localStorage.getItem("at");
  if (!at) throw new Error();

  const response = await axios.get<MovieCardDto[]>(
    `api/movie/topRated/${userId}`,
    {
      headers: { Authorization: `Bearer ${at}` },
    }
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

  const response = await axios.post<string, AxiosResponse, NewReviewDto>(
    `api/movie/${movieId}/review?memberId=${userId}`,
    newReview,
    {
      headers: { Authorization: `Bearer ${at}` },
    }
  );

  console.log(response);

  return response.data;
};
