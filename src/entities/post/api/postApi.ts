import { authAxios, noAuthAxios } from "@/shared/api/base";
import { PageResponseDto } from "@/shared/model/types";
import { PostDetailDto } from "../model/types";

export const fetchPosts = async (page: number, size: number) => {
  const response = await noAuthAxios.get<PageResponseDto<PostDetailDto>>(
    "/api/posts",
    {
      params: {
        page,
        size,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export const fetchSearchResults = async (
  keyword: string,
  page: number,
  size: number
) => {
  const response = await authAxios.get(`/api/post/search/${keyword}`, {
    params: {
      page,
      size,
    },
  });

  console.log(response.data);
  return response.data;
};

export const fetchPostDetail = async (postId: number) => {
  const response = await authAxios.get<PostDetailDto>(`/api/post/${postId}`);
  console.log(response);
  return response.data;
};

export const toggleLike = async (postId: number, liked: boolean) => {
  if (liked) {
    await authAxios.delete(`/api/posts/${postId}/like`);
  } else {
    await authAxios.post(`/api/posts/${postId}/like`);
  }
};

export const createPost = async (
  title: string,
  content: string,
  textContent: string,
  thumbnail: string
) => {
  const response = await authAxios.post(
    `/api/post`,
    { title, content, textContent, mainImgUrl: thumbnail },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export const updatePost = async (
  postId: number,
  title: string,
  content: string,
  textContent: string,
  thumbnail: string
) => {
  const response = await authAxios.patch(
    `/api/post/${postId}`,
    { title, content, textContent, mainImgUrl: thumbnail },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await authAxios.delete(`/api/post/${postId}`);

  console.log(response.data);
  return response.data;
};

export const fetchComments = async (postId: number) => {
  const response = await authAxios.get(`/api/post/${postId}/comments`);
  console.log(response.data);
  return response.data;
};

export const deleteComment = async (commentId: number) => {
  const response = await authAxios.delete(`/api/comments/${commentId}`);
  return response.data;
};

export const createComment = async (postId: number, content: string) => {
  const response = await authAxios.post(
    `/api/posts/${postId}/comments`,
    { content },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const updateComment = async (postId: number, content: string) => {
  const response = await authAxios.patch(
    `/api/comments/${postId}`,
    { content },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
