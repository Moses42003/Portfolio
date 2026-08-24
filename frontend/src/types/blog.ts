import type { Category, ID, ISODateString, PublishStatus } from "./common";

export interface BlogPost {
  id: ID;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  category: Category;
  tags: string[];
  status: PublishStatus;
  published_at: ISODateString;
  reading_time: number;
  author: string;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export type BlogPostInput = Omit<BlogPost, "id" | "category" | "created_at" | "updated_at"> & {
  category_id: ID;
};
