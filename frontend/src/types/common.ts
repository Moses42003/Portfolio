export type ID = string;
export type ISODateString = string;

export type ApiStatus = "idle" | "submitting" | "success" | "error";
export type PublishStatus = "draft" | "published" | "archived";
export type MessageStatus = "unread" | "read" | "replied" | "archived";

export interface Category {
  id: ID;
  name: string;
  slug: string;
  description?: string;
}

export interface Technology {
  id: ID;
  name: string;
  slug: string;
  icon?: string;
  category?: string;
}

export interface ApiErrorPayload {
  status: number;
  message: string;
  details?: unknown;
}

export interface DashboardMetric {
  label: string;
  total: number | string;
  growth: string;
  tone: "violet" | "blue" | "emerald" | "amber";
}
