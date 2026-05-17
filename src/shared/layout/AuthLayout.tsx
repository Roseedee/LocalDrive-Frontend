import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/auth.store";

export default function AuthLayout() {

  const user_id = useAuthStore(s => s.user_id);
  const loading = useAuthStore(s => s.loading);

  if (loading) {
    return null;
  }

  if (user_id) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

}