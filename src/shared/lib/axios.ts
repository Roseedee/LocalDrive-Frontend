import axios from "axios";

import { sessionStorage } from "./sessionStorage";

import { useAuthStore } from "@/modules/auth/store/auth.store";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// REQUEST
api.interceptors.request.use((config) => {
  const { isSessionExpired } = useAuthStore.getState();

  if (isSessionExpired) {
    return Promise.reject(new Error("Session expired"));
  }

  const token = localStorage.getItem("accessToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    const status = err.response?.status;

    if (!original) return Promise.reject(err);

    // ถ้า refresh ยังพัง → logout
    if (original.url?.includes("/auth/refresh")) {
      useAuthStore.getState().expireSession();
      localStorage.removeItem("accessToken");
      window.location.replace("/init");
      return Promise.reject(err);
    }

    // 401 → try refresh (ครั้งเดียว)
    if (status === 401 && !original._retry) {
      original._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const data = res.data;

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("device_uuid", data.device_uuid);

        original.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(original);

      } catch {
        useAuthStore.getState().expireSession();
        localStorage.removeItem("accessToken");
        window.location.replace("/init");
      }
    }

    // 403 → logout
    if (status === 403) {
      useAuthStore.getState().expireSession();
      localStorage.removeItem("accessToken");
      window.location.replace("/init");
    }

    return Promise.reject(err);
  }
);

// LOGOUT
// อาจจะมีการใช้รวมกับปุ่ม Logout ในหน้า FilesPage หรือหน้าอื่นๆ ที่ต้องการให้ผู้ใช้สามารถออกจากระบบได้
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch {}

  sessionStorage.clear();
  useAuthStore.getState().expireSession();
  localStorage.removeItem("accessToken");
  window.location.replace("/init");
};