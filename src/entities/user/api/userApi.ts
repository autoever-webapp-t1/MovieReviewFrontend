import { Score } from "@/entities/movie";
import { PostDetailDto } from "@/entities/post/model/types";
import { MyReviewDetailDto } from "@/pages/user/model/types";
import { authAxios } from "@/shared/api/base";
import { PageResponseDto } from "@/shared/model/types";

export const fetchMyRatingScore = async () => {
  const response = await authAxios.get<Score>(`api/user/rate`);

  return response.data;
};

export const fetchMyReivew = async (pageParam: number) => {
  const response = await authAxios.get<PageResponseDto<MyReviewDetailDto>>(
    `api/user/reviews?page=${pageParam}&size=10`
  );

  return response.data;
};

export const fetchMyPost = async (pageParam: number) => {
  const response = await authAxios.get<PageResponseDto<PostDetailDto>>(
    `api/post/myPost?page=${pageParam}&size=10`
  );

  return response.data;
};

export const updateNickname = async (newNickname: string) => {
  const response = await authAxios.put(
    `api/user/nickname?newname=${newNickname}`
  );

  return response.data;
};
