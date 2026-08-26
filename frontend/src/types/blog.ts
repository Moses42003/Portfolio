import type { Category, ID, ISODateString, PublishStatus } from "./common";

export interface BlogPost {
  id: ID;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  thumbnail_url?: string;
  category?: Category | null;
  tags?: string[];
  status?: PublishStatus;
  published?: boolean;
  published_at?: ISODateString;
  reading_time?: number;
  author?: string;
  created_at?: ISODateString;
  updated_at?: ISODateString;
}

export type BlogPostInput = Omit<BlogPost, "id" | "category" | "created_at" | "updated_at"> & {
  category_id: ID;
};
