import { create } from 'zustand';

import type { FileUploadModel } from "../models/itemUpload.model";

interface FileState {
    // Upload state
    filesUpload: FileUploadModel[];

    setFilesUpload: (files: FileUploadModel[]) => void;
    addFileUpload: (file: FileUploadModel) => void;
    addManyFileUpload: (files: FileUploadModel[]) => void;
    updateFileUpload: (id: string, data: Partial<FileUploadModel>) => void;
    removeFileUpload: (id: string) => void;
}

export const useFileStore = create<FileState>((set) => ({
    // Upload state
    filesUpload: [],

    setFilesUpload: (files) => set({ filesUpload: files }),
    addFileUpload: (file) => set((state) => ({ filesUpload: [...state.filesUpload, file] })),
    addManyFileUpload: (files: FileUploadModel[]) => set((state) => ({ filesUpload: [...state.filesUpload, ...files], })),
    updateFileUpload: (id, data) => set((state) => ({ filesUpload: state.filesUpload.map(f => f.id === id ? { ...f, ...data } : f )})),
    removeFileUpload: (id) => set((state) => ({ filesUpload: state.filesUpload.filter(file => file.id !== id) })),

}));