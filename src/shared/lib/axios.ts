import axios from "axios";

declare module "axios" {
    export interface AxiosRequestConfig {
        skipAuthRefresh?: boolean;
    }

    export interface InternalAxiosRequestConfig {
        skipAuthRefresh?: boolean;
    }
}

import { useAuthStore } from "@/modules/auth/store/auth.store";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// =========================
// REQUEST
// =========================

api.interceptors.request.use((config) => {

  const { isSessionExpired } = useAuthStore.getState();

  const isPublicAuthRequest =
    config.url?.includes("/auth/login") ||
    config.url?.includes("/auth/init");

  // block request ถ้า session หมดแล้ว
  // แต่ยังอนุญาต login / init / skipAuthRefress
  if (
    isSessionExpired &&
    !isPublicAuthRequest &&
    !config.skipAuthRefresh
  ) {
    return Promise.reject(
      new Error("Session expired")
    );
  }

  if(config.skipAuthRefresh) {
    return config;
  }

  const token = localStorage.getItem("accessToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// REFRESH CONTROL
// =========================

let isRefreshing = false;

let pendingRequests: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
  pendingRequests.forEach((callback) => { callback(token); });
  pendingRequests = [];

};

// =========================
// LOGOUT
// =========================

export const logout = async () => {

  try {
    await api.post("/auth/logout");
  } catch { }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("device_uuid");

  useAuthStore.getState().expireSession();
};

// =========================
// RESPONSE
// =========================

api.interceptors.response.use(
  (res) => res,

  async (err) => {

    const original = err.config;

    // =========================
    // NETWORK ERROR
    // =========================

    if (!err.response) {

      console.error("Network error or backend offline");

      return Promise.reject(err);
    }

    const status = err.response.status;

    if (!original) {
      return Promise.reject(err);
    }

    if(original.skipAuthRefresh) {
      return Promise.reject(err);
    }

    // =========================
    // PUBLIC AUTH ENDPOINT
    // ห้ามเข้า refresh flow
    // =========================

    const isPublicAuthRequest =
      original.url?.includes("/auth/login") ||
      original.url?.includes("/auth/init");

    if (isPublicAuthRequest) {
      return Promise.reject(err);
    }

    // =========================
    // REFRESH FAILED
    // =========================

    if (
      original.url?.includes("/auth/refresh") &&
      (status === 401 || status === 403)
    ) {

      localStorage.removeItem("accessToken");
      localStorage.removeItem("device_uuid");

      useAuthStore
        .getState()
        .expireSession();

      return Promise.reject(err);
    }

    // =========================
    // ACCESS TOKEN EXPIRED
    // =========================

    if (
      status === 401 &&
      !original._retry
    ) {

      original._retry = true;

      // =========================
      // WAIT FOR CURRENT REFRESH
      // =========================

      if (isRefreshing) {

        return new Promise((resolve) => {

          pendingRequests.push((token) => {

            original.headers.Authorization =
              `Bearer ${token}`;

            resolve(api(original));

          });

        });

      }

      isRefreshing = true;

      try {

        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          {
            withCredentials: true
          }
        );

        const data = res.data;

        // =========================
        // SAVE NEW ACCESS TOKEN
        // =========================

        localStorage.setItem("accessToken", data.accessToken);

        localStorage.setItem("device_uuid", data.device.uuid);

        // =========================
        // RELEASE WAITING REQUESTS
        // =========================

        processQueue(
          data.accessToken
        );

        // =========================
        // RETRY ORIGINAL REQUEST
        // =========================

        original.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return api(original);

      } catch (refreshError) {

        // =========================
        // REFRESH FAILED
        // =========================

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "device_uuid"
        );

        useAuthStore
          .getState()
          .expireSession();

        return Promise.reject(refreshError);

      } finally {

        isRefreshing = false;

      }
    }

    // =========================
    // FORBIDDEN
    // =========================

    if (status === 403) {

      localStorage.removeItem("accessToken");

      localStorage.removeItem("device_uuid");

      useAuthStore.getState().expireSession();
    }

    return Promise.reject(err);
  }
);