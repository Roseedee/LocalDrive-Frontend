import { api } from '@/shared/lib/axios';

let selectionToken: string | null = null;

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

export async function login(username: string, password: string) {
    try {
        const res = await api.post('/auth/login', {username, password})
        selectionToken = res.data.selectionToken;
        return res.data;
    } catch (err) {
        console.error("Error Login : ", err)
        throw err
    }
}

export async function findDevice() {
    try {
        if(!selectionToken) {
            throw new Error("Device selection session expired");
        }
        const res = await api.get("/auth/find_replaceable_devices", {
            headers: {
                Authorization: `Bearer ${selectionToken}`
            },
            skipAuthRefresh: true,
        });
        return res.data
    }catch (err) {
        console.error("Error get replaceable device list: ", err)
        throw err
    }
}

export async function logout() {
    try {
        await api.post('/auth/logout');
    } catch (err) {
        console.log('Error logging out:', err);
        throw err;
    }
}