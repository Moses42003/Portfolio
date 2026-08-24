import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api/client";

export const useProfile = () => useQuery({ queryKey: ["profile"], queryFn: api.profile });
