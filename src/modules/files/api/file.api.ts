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
        return res;
        // console.log(res)
    } catch (err) {
        console.log(err)
        updateFileUpload(id, {
            status: "error"
        })
    }
}

export async function uploadPendingFiles() {
    const { filesUpload, updateFileUpload } = useFileStore.getState();

    const pendingFiles = filesUpload.filter(
        f => f.status === "pending"
    );

    if (pendingFiles.length === 0) return;

    const formData = new FormData();

    pendingFiles.forEach(f => {

        formData.append("file", f.file);

        updateFileUpload(f.id, {
            status: "uploading",
            progress: 0
        });
    });

    try {

        const res = await api.post('/files/', formData, {

            onUploadProgress: (e) => {

                const percent = Math.round(
                    (e.loaded / (e.total || 1)) * 100
                );

                // progress รวม
                pendingFiles.forEach(f => {
                    updateFileUpload(f.id, {
                        progress: percent
                    });
                });
            }
        });

        const uploadedItems = res.data.items;

        pendingFiles.forEach((f) => {

            // const uploaded = uploadedItems[index];

            updateFileUpload(f.id, {
                progress: 100,
                status: "completed"
            });

            // console.log(uploaded);
        });

        return uploadedItems;

    } catch (err) {

        console.log(err);

        pendingFiles.forEach(f => {

            updateFileUpload(f.id, {
                status: "error"
            });
        });

        throw err;
    }
}

export async function createFolder(name: string, parentId?: string | null) {
    try {
        const res = await api.post('/files/', {
            name,
            parentId: parentId || null,
        });
        return res.data;
    } catch (err) {
        console.log('Error creating folder:', err);
        return null;
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