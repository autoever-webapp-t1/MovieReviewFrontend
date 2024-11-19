import { authAxios } from "@/shared/api/base";
import { AwardsPastListDto } from "../model/types";
import { MovieDetailDto } from "@/entities/movie";

export const fetchAwards = async (awardsId: number) => {
  const response = await authAxios.get<MovieDetailDto[]>(
    `api/awards/${awardsId}`
  );

  return response.data;
};

export const fetchPastAwards = async () => {
  const response = await authAxios.get<AwardsPastListDto[]>("api/awards/past");

  return response.data;
};
