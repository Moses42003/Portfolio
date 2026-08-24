import type { ID } from "./common";

export interface Testimonial {
  id: ID;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  featured: boolean;
}
