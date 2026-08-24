import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingState } from "../ui/States";
import { useAuth } from "../../providers/AuthProvider";

export function ProtectedRoute() {
  const { status } = useAuth();
  const location = useLocation();
  if (status === "loading") return <LoadingState label="Checking session" />;
  if (status === "unauthenticated") return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return <Outlet />;
}
