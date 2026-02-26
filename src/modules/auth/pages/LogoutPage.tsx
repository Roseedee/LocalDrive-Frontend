import { useEffect } from "react";
import { api } from "@/shared/lib/axios";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      await api.post("/auth/logout");
      navigate("/", { replace: true });
    }

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
}