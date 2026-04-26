import { api } from '@/shared/lib/axios';

import { useFileStore } from '../store/file.store';

export async function uploadFileByID(id: string) {
    const { filesUpload, updateFileUpload } = useFileStore.getState();

    const target = filesUpload.find(f => f.id === id);
    if (!target || !target.file) return;

    const formData = new FormData();
    formData.append("file", target.file);

    try {
        const res = await api.post('/files/', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (e) => {
                const percent = Math.round((e.loaded / (e.total || 1)) * 100)

                updateFileUpload(id, {
                    progress: percent,
                    status: "uploading"
                })
            }
        })
        updateFileUpload(id, {
            progress: 100,
            status: "completed"
        })
        console.log(res)
    } catch (err) {
        updateFileUpload(id, {
            status: "error"
        })
    }
}

export async function getItemsList() {
    try {
        const res = await api.get('/files/');
        return res.data;
    } catch (err) {
        console.log('Error fetching current user:', err);
        return null;
    }
}