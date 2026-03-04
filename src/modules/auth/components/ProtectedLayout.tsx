import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/auth.store"

export default function ProtectedLayout() {
  const user_id = useAuthStore(s => s.user_id)
  const loading = useAuthStore(s => s.loading)

  if (loading) return <div>Loading...</div>

  if (!user_id) return <Navigate to="/init" replace />

  return <Outlet />
}