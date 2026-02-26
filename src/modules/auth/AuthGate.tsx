import { useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "./api/auth.api"

export default function AuthGate() {
  const navigate = useNavigate()

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

  return <div>Loading...</div>
}