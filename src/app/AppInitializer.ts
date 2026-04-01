import { useEffect } from "react"
import { useAuthStore } from "@/modules/auth/store/auth.store"
import { getCurrentUser } from "@/modules/auth/api/auth.api"

export function AppInitializer({ children } : { children: React.ReactNode }) {
  const setSession = useAuthStore(s => s.setSession)
  const clearAuth = useAuthStore(s => s.clearAuth)

  useEffect(() => {

    const token = localStorage.getItem("accessToken")
    if (!token) {
      console.log("No token found, clearing auth state")
      clearAuth()
      return
    }

    async function init() {
      getCurrentUser().then(user => {
        if (user) {
          setSession(user)
        } else {
          clearAuth()
        }
      }).catch((err) => {
        console.log('Error fetching current user:', err)
        clearAuth()
      } )
    }

    init()
  }, [])

  return children
}