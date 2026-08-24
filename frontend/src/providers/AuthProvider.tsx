/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { api, tokenStore } from "../services/api/client";
import type { LoginPayload, User } from "../types/auth";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      if (!tokenStore.getAccessToken()) {
        setStatus("unauthenticated");
        return;
      }
      try {
        const currentUser = await api.auth.me();
        setUser(currentUser);
        setStatus("authenticated");
      } catch {
        tokenStore.clear();
        setUser(null);
        setStatus("unauthenticated");
      }
    };
    void bootstrap();
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await api.auth.login(payload);
    tokenStore.setTokens(response);
    setUser(response.user);
    setStatus("authenticated");
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } finally {
      tokenStore.clear();
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  const value = useMemo(() => ({ status, user, login, logout }), [login, logout, status, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
