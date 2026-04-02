import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/auth.store"
import { logout } from "@/shared/lib/axios"

import "@/shared/styles/loading.css"

export default function ProtectedLayout() {
  const user_id = useAuthStore(s => s.user_id)
  const loading = useAuthStore(s => s.loading)
  const isSessionExpired = useAuthStore(s => s.isSessionExpired)

  if (!loading && (isSessionExpired || !user_id)) {
    logout();
    // return <Navigate to="/init" replace />
  }

  return (
    <>
      <Outlet />

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <span className="loading-text">กำลังโหลด</span>
        </div>
      )}
    </>
  )
}