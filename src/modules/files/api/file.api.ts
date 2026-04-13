import { api } from '@/shared/lib/axios';

export async function uploadFile() {
    try {
        const res = await api.post('/files/');
        return res.data;
    } catch (err) {
        console.log('Error fetching current user:', err);
        return null;
    }
}