import { create } from 'zustand';

interface AuthState {
    user_id: string | null;
    device_name: string | null;
    loading: boolean;
    isSessionExpired: boolean;

    setSession: (data: any) => void;
    clearAuth: () => void;
    expireSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user_id: null,
    device_name: null,
    loading: true,
    isSessionExpired: false,

    setSession: (data) => set({
        user_id: data.user.id,
        device_name: data.device.name,
        loading: false,
        isSessionExpired: false,
    }),

    clearAuth: () => set({
        user_id: null,
        device_name: null,
        loading: false,
    }),

    expireSession: () => set({
        user_id: null,
        device_name: null,
        loading: false,
        isSessionExpired: true,
    }),
}));