import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api/client";

export const useBlogPosts = () => useQuery({ queryKey: ["blog", "posts"], queryFn: api.blogPosts });
export const useBlogPost = (slug: string | undefined) => useQuery({ queryKey: ["blog", "posts", slug], queryFn: () => api.blogPost(slug ?? ""), enabled: Boolean(slug) });
export const useAdminBlogPosts = () => useQuery({ queryKey: ["admin", "blog"], queryFn: api.admin.blogPosts });
export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: unknown) => api.post("/api/v1/admin/blog/posts", payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "blog"] }) });
};
export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, payload }: { id: string; payload: unknown }) => api.put(`/api/v1/admin/blog/posts/${id}`, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "blog"] }) });
};
export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api.delete(`/api/v1/admin/blog/posts/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "blog"] }) });
};
