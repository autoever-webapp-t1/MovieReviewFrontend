import { axios } from "@/shared/api/base";
import { PageResponseDto } from "@/shared/model/types";
import { PostDetailDto } from "../model/types";

export const fetchPosts = async () => {
  const response = await axios.get<PageResponseDto<PostDetailDto>>("posts");

  return response.data;
};
