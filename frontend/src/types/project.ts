import type { Category, ID, ISODateString, PublishStatus, Technology } from "./common";

export interface Project {
  id: ID;
  title: string;
  slug: string;
  description: string;
  content?: string;
  thumbnail?: string;
  gallery?: string[];
  category: Category;
  technologies: Technology[];
  github_url?: string;
  live_url?: string;
  featured: boolean;
  status: PublishStatus;
  year: string;
  start_date?: ISODateString;
  end_date?: ISODateString;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export type ProjectInput = Omit<Project, "id" | "created_at" | "updated_at" | "category" | "technologies"> & {
  category_id: ID;
  technology_ids: ID[];
};
