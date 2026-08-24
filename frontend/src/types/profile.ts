import type { ID } from "./common";

export interface ProfileStat {
  id: ID;
  value: string;
  label: string;
  description?: string;
}

export interface Profile {
  id: ID;
  name: string;
  brand: string;
  role: string;
  greeting: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  cv_url?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  stats: ProfileStat[];
  about: {
    introduction: string;
    philosophy: string;
    builds: string[];
    approach: string[];
    technology_overview: Record<string, string[]>;
  };
}
