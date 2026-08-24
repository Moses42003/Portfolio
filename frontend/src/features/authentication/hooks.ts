import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api/client";
import type { LoginPayload } from "../../types/auth";

export const useLoginMutation = () => useMutation({ mutationFn: (payload: LoginPayload) => api.auth.login(payload) });
