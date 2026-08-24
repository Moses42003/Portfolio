import { endpoints } from "./endpoints";
import { authResponse, dashboardMetrics, experience, messages, posts, profile, projects, skills, testimonials } from "./mock/data";
import type { AuthResponse, BlogPost, ContactMessage, ContactPayload, Experience, LoginPayload, Project, Skill } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";
const TIMEOUT_MS = 12_000;

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = RequestInit & { auth?: boolean };

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenStore = {
  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,
  setTokens: (tokens: Pick<AuthResponse, "access_token" | "refresh_token">) => {
    accessToken = tokens.access_token;
    refreshToken = tokens.refresh_token;
  },
  clear: () => {
    accessToken = null;
    refreshToken = null;
  },
};

const wait = <T,>(value: T, delay = 240) => new Promise<T>((resolve) => window.setTimeout(() => resolve(value), delay));

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const body = contentType?.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof body === "object" && body && "detail" in body ? String(body.detail) : humanizeStatus(response.status);
    throw new ApiError(response.status, message, body);
  }

  return body as T;
}

function humanizeStatus(status: number) {
  const messages: Record<number, string> = {
    401: "Your session has expired. Please sign in again.",
    403: "You do not have permission to perform this action.",
    404: "The requested resource could not be found.",
    422: "Please check the submitted information.",
    429: "Too many requests. Please wait a moment and try again.",
    500: "The server had a problem. Please try again shortly.",
  };
  return messages[status] ?? "Something went wrong. Please try again.";
}

async function request<T>(path: string, options: RequestOptions = {}, retry = true): Promise<T> {
  if (USE_MOCK_API) return mockRequest<T>(path, options);

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");
    if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
    if (options.auth !== false && tokenStore.getAccessToken()) {
      headers.set("Authorization", `Bearer ${tokenStore.getAccessToken()}`);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers, signal: controller.signal });
    if (response.status === 401 && retry && tokenStore.getRefreshToken()) {
      const refreshed = await api.auth.refresh();
      tokenStore.setTokens(refreshed);
      return request<T>(path, options, false);
    }
    return parseResponse<T>(response);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(408, "The request timed out. Please try again.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

function jsonOptions(method: string, body?: unknown): RequestOptions {
  return { method, body: body === undefined ? undefined : JSON.stringify(body) };
}

async function mockRequest<T>(path: string, options: RequestOptions): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  if (path === endpoints.profile) return wait(profile as T);
  if (path === endpoints.featuredProjects) return wait(projects.filter((project) => project.featured) as T);
  if (path === endpoints.projects) return wait(projects as T);
  if (path.startsWith("/api/v1/projects/")) return wait(projects.find((project) => path.endsWith(project.slug)) as T);
  if (path === endpoints.skills) return wait(skills as T);
  if (path === endpoints.experience) return wait(experience as T);
  if (path === endpoints.blogPosts) return wait(posts as T);
  if (path.startsWith("/api/v1/blog/posts/")) return wait(posts.find((post) => path.endsWith(post.slug)) as T);
  if (path === endpoints.testimonials) return wait(testimonials as T);
  if (path === endpoints.contact && method === "POST") throw new ApiError(503, "Contact API is not connected yet. Please try again after the backend is available.");
  if (path === endpoints.auth.login && method === "POST") return wait(authResponse as T);
  if (path === endpoints.auth.refresh && method === "POST") return wait(authResponse as T);
  if (path === endpoints.auth.me) return wait(authResponse.user as T);
  if (path === endpoints.auth.logout && method === "POST") return wait({ ok: true } as T);
  if (path === endpoints.admin.dashboard) return wait({ metrics: dashboardMetrics, recent_projects: projects.slice(0, 4), analytics: [42, 64, 58, 77, 91, 104], activity: ["Published Commerce Core", "Added FastAPI skill", "Replied to a message"] } as T);
  if (path === endpoints.admin.projects) return wait(projects as T);
  if (path.startsWith("/api/v1/admin/projects/")) return wait(projects.find((project) => path.endsWith(project.id)) as T);
  if (path === endpoints.admin.skills) return wait(skills as T);
  if (path === endpoints.admin.experience) return wait(experience as T);
  if (path === endpoints.admin.blogPosts) return wait(posts as T);
  if (path === endpoints.admin.messages) return wait(messages as T);
  if (path.startsWith("/api/v1/admin/messages/")) return wait(messages.find((message) => path.endsWith(message.id)) as T);
  return wait({ ok: true } as T);
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>(path, { ...jsonOptions("POST", body), ...options }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>(path, { ...jsonOptions("PUT", body), ...options }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: "DELETE" }),
  profile: () => api.get<typeof profile>(endpoints.profile),
  projects: () => api.get<Project[]>(endpoints.projects),
  featuredProjects: () => api.get<Project[]>(endpoints.featuredProjects),
  project: (slug: string) => api.get<Project | undefined>(endpoints.project(slug)),
  skills: () => api.get<Skill[]>(endpoints.skills),
  experience: () => api.get<Experience[]>(endpoints.experience),
  blogPosts: () => api.get<BlogPost[]>(endpoints.blogPosts),
  blogPost: (slug: string) => api.get<BlogPost | undefined>(endpoints.blogPost(slug)),
  testimonials: () => api.get<typeof testimonials>(endpoints.testimonials),
  contact: (payload: ContactPayload) => api.post<{ id: string }>(endpoints.contact, payload, { auth: false }),
  auth: {
    login: (payload: LoginPayload) => api.post<AuthResponse>(endpoints.auth.login, payload, { auth: false }),
    refresh: () => api.post<AuthResponse>(endpoints.auth.refresh, { refresh_token: tokenStore.getRefreshToken() }, { auth: false }),
    logout: () => api.post<{ ok: boolean }>(endpoints.auth.logout),
    me: () => api.get<AuthResponse["user"]>(endpoints.auth.me),
  },
  admin: {
    dashboard: () => api.get<{ metrics: typeof dashboardMetrics; recent_projects: Project[]; analytics: number[]; activity: string[] }>(endpoints.admin.dashboard),
    projects: () => api.get<Project[]>(endpoints.admin.projects),
    project: (id: string) => api.get<Project | undefined>(endpoints.admin.project(id)),
    createProject: (payload: unknown) => api.post<Project>(endpoints.admin.projects, payload),
    updateProject: (id: string, payload: unknown) => api.put<Project>(endpoints.admin.project(id), payload),
    deleteProject: (id: string) => api.delete<{ ok: boolean }>(endpoints.admin.project(id)),
    skills: () => api.get<Skill[]>(endpoints.admin.skills),
    experience: () => api.get<Experience[]>(endpoints.admin.experience),
    blogPosts: () => api.get<BlogPost[]>(endpoints.admin.blogPosts),
    messages: () => api.get<ContactMessage[]>(endpoints.admin.messages),
  },
};
