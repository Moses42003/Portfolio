import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api/client";
import type { ContactPayload } from "../../types/contact";

export const useSubmitContact = () => useMutation({ mutationFn: (payload: ContactPayload) => api.contact(payload) });
