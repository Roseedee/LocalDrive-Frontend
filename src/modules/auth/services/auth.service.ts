import { api } from "../../../shared/lib/axios"

export async function getCurrentUser() {
  try {
    const res = await api.get("/auth/me")
    return res.data
  } catch {
    return null
  }
}