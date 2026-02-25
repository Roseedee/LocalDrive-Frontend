import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "./services/auth.service"

export default function AuthGate() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser()

      if (user) {
        navigate("/files", { replace: true })
      } else {
        navigate("/register", { replace: true })
      }
    }

    checkAuth()
  }, [navigate])

  if (loading) return <div>Loading...</div>

  return null
}