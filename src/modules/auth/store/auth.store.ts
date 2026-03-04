import { create } from 'zustand';

interface AuthState {
    user_id: string | null;
    device_name: string | null;
    loading: boolean;
    setSession: (data: any) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user_id: null,
    device_name: null,
    loading: true,
    setSession: (data) => set({
        user_id: data.user.id,
        device_name: data.device_name,
        loading: false,
    }), 
    clearAuth: () => set({
        user_id: null,
        device_name: null,
        loading: false,
    }),
})) 