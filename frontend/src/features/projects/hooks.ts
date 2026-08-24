import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api/client";

export const useProjects = () => useQuery({ queryKey: ["projects"], queryFn: api.projects });
export const useFeaturedProjects = () => useQuery({ queryKey: ["projects", "featured"], queryFn: api.featuredProjects });
export const useProject = (slug: string | undefined) => useQuery({ queryKey: ["projects", slug], queryFn: () => api.project(slug ?? ""), enabled: Boolean(slug) });
export const useAdminProjects = () => useQuery({ queryKey: ["admin", "projects"], queryFn: api.admin.projects });
export const useAdminProject = (id: string | undefined) => useQuery({ queryKey: ["admin", "projects", id], queryFn: () => api.admin.project(id ?? ""), enabled: Boolean(id) });

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: api.admin.createProject, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "projects"] }) });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, payload }: { id: string; payload: unknown }) => api.admin.updateProject(id, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "projects"] }) });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: api.admin.deleteProject, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "projects"] }) });
};
