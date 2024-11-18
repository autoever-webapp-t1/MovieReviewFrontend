import { useQuery } from "@tanstack/react-query";
import { fetchPostDetail, fetchPosts } from "./postApi";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60,
  });
};

export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostDetail(postId),
    staleTime: 1000 * 60,
  });
};
