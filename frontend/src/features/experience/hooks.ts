import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api/client";

export const useExperience = () => useQuery({ queryKey: ["experience"], queryFn: api.experience });
export const useAdminExperience = () => useQuery({ queryKey: ["admin", "experience"], queryFn: api.admin.experience });
export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: unknown) => api.post("/api/v1/admin/experience", payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "experience"] }) });
};
export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, payload }: { id: string; payload: unknown }) => api.put(`/api/v1/admin/experience/${id}`, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "experience"] }) });
};
export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api.delete(`/api/v1/admin/experience/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "experience"] }) });
};
