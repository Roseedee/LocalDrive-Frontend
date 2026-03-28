import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// request → ใส่ token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// 🔥 refresh instance (ไม่มี interceptor)
const refreshApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// response → handle refresh
api.interceptors.response.use(
    res => res,
    async (err) => {
        const original = err.config;

        // ❗ กัน loop refresh
        if (original.url.includes('/auth/refresh')) {
            return Promise.reject(err);
        }

        if (err.response?.status === 401 && !original._retry) {
            original._retry = true;

            try {
                const res = await refreshApi.post('/auth/refresh');

                const newToken = res.data.accessToken;

                localStorage.setItem('accessToken', newToken);

                original.headers.Authorization = `Bearer ${newToken}`;

                return api(original);

            } catch {
                localStorage.removeItem('accessToken');
                window.location.href = '/init';
            }
        }

        return Promise.reject(err);
    }
);