import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api/client";

export const useTestimonials = () => useQuery({ queryKey: ["testimonials"], queryFn: api.testimonials });
