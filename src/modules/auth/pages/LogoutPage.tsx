import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"

export default function LogoutPage() {
  const clearAuth = useAuthStore(s => s.clearAuth)
  const navigate = useNavigate()

  useEffect(() => {
    async function doLogout() {
      await logout()
      clearAuth()
      navigate("/init", { replace: true })
    }

    doLogout()
  }, [])

  return <div>Logging out...</div>
}