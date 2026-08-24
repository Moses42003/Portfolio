import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api/client";

export const useSkills = () => useQuery({ queryKey: ["skills"], queryFn: api.skills });
export const useAdminSkills = () => useQuery({ queryKey: ["admin", "skills"], queryFn: api.admin.skills });
export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: unknown) => api.post("/api/v1/admin/skills", payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "skills"] }) });
};
export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, payload }: { id: string; payload: unknown }) => api.put(`/api/v1/admin/skills/${id}`, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "skills"] }) });
};
export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api.delete(`/api/v1/admin/skills/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "skills"] }) });
};
