import { noAuthAxios } from "@/shared/api/base";
import { PageResponseDto } from "@/shared/model/types";
import { PostDetailDto } from "../model/types";

export const fetchPosts = async () => {
  const response = await noAuthAxios.get<PageResponseDto<PostDetailDto>>(
    "posts"
  );

  return response.data;
};
