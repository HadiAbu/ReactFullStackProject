import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost } from "../api/posts";

export const usePosts = () =>
  useQuery({
    queryKey: ["POST"],
    queryFn: getPosts,
    staleTime: 1000 * 60, // 1 min
    cacheTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: true,
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["POST"] }),
  });
};
