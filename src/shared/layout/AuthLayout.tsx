import { Outlet } from "react-router-dom";

import "@/modules/auth/styles/authPages.css";

export default function AuthLayout() {
  return (
    <main className="auth-page">
      <Outlet />
    </main>
  );
}