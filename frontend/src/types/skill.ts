import type { ID } from "./common";

export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps" | "Tools" | "Hardware / Systems";
export type SkillProficiency = "Learning" | "Working" | "Advanced" | "Expert";

export interface Skill {
  id: ID;
  name: string;
  category: SkillCategory;
  icon: string;
  proficiency: SkillProficiency;
  years: number;
  featured: boolean;
  description: string;
  sort_order: number;
}
