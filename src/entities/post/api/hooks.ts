import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./postApi";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};
