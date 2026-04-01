import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"
import { sessionStorage } from "@/shared/lib/sessionStorage"

export default function LogoutPage() {
  const clearAuth = useAuthStore(s => s.clearAuth)
  const navigate = useNavigate()

  useEffect(() => {
    async function doLogout() {
      await logout()
      clearAuth()
      sessionStorage.clear()
      navigate("/init", { replace: true })
    }

    doLogout()
  }, [])

  return <div>Logging out...</div>
}