import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost } from "../api/posts.js";

export const usePosts = () =>
  useQuery(["posts"], getPosts, {
    staleTime: 1000 * 60, // 1 min cache
    cacheTime: 1000 * 60 * 5, // keep data in memory for 5 min
    refetchOnWindowFocus: true, // auto refetch on tab focus
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(createPost, {
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });
};
