import type { ID } from "./common";

export interface User {
  id: ID;
  name: string;
  email: string;
  role: "admin" | "editor";
  avatar_url?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: User;
}
