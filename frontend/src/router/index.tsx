import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { LoadingState } from "../components/ui/States";
import { adminRoutes } from "./adminRoutes";
import { publicRoutes } from "./publicRoutes";

export function AppRouter() {
  const routes = useRoutes([...adminRoutes, publicRoutes]);
  return <Suspense fallback={<LoadingState />}>{routes}</Suspense>;
}
