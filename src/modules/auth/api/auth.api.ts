import { api } from '@/shared/lib/axios';

export async function getCurrentUser() {
    try {
        const res = await api.get('/auth/me');
        return res.data;
    } catch (err) {
        console.log('Error fetching current user:', err);
        return null;
    }
}

export async function register(deviceName: string) {
    try {
        const res = await api.post('/auth/init', {device_name: deviceName});
        return res.data;
    } catch (err) {
        console.log('Error registering user:', err);
        throw err;
    }
}