import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyPost, fetchMyReivew } from "./userApi";

export const useMyReview = () => {
  return useInfiniteQuery({
    queryKey: ["my", "review"],
    queryFn: ({ pageParam }) => fetchMyReivew(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current + 1 < lastPage.totalPage
        ? lastPage.current + 1
        : undefined;
    },
  });
};

export const useMyPost = () => {
  return useInfiniteQuery({
    queryKey: ["my", "post"],
    queryFn: ({ pageParam }) => fetchMyPost(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current + 1 < lastPage.totalPage
        ? lastPage.current + 1
        : undefined;
    },
  });
};
