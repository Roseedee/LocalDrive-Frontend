import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/auth.store";

import "@/shared/styles/loading.css";

export default function ProtectedLayout() {
  const user_id = useAuthStore((s) => s.user_id);
  const loading = useAuthStore((s) => s.loading);
  const isSessionExpired = useAuthStore(
    (s) => s.isSessionExpired
  );

  const deviceUUID =
    localStorage.getItem("device_uuid");

  // ยังตรวจ auth ไม่เสร็จ
  // ห้าม render Outlet
  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner" />
        <span className="loading-text">
          กำลังโหลด
        </span>
      </div>
    );
  }

  // ยังไม่มี login session
  if (
    isSessionExpired ||
    !user_id
  ) {
    return (
      <Navigate
        to="/init"
        replace
      />
    );
  }

  // login แล้ว แต่ยังไม่ได้ผ่าน compare device
  if (!deviceUUID) {
    return (
      <Navigate
        to="/compare-device"
        replace
      />
    );
  }

  // ครบแล้วค่อยเข้า protected pages
  return <Outlet />;
}