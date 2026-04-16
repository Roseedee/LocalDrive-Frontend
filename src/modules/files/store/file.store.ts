import { create } from 'zustand';

import type { FileUploadModel, uploadState } from "../models/itemUpload.model";

interface FileState {
    // Toolsbar state
    showFileInfo: boolean;
    isSelectedMultiItem: boolean;

    setShowFileInfo: (show: boolean) => void;
    setIsSelectedMultiItem: (isMulti: boolean) => void;


    // Upload state
    filesUpload: FileUploadModel[];

    setFilesUpload: (files: FileUploadModel[]) => void;
    addFileUpload: (file: FileUploadModel) => void;
    addManyFileUpload: (files: FileUploadModel[]) => void;
    updateFileUpload: (id: string, data: Partial<FileUploadModel>) => void;
    removeFileUpload: (id: string) => void;
}

export const useFileStore = create<FileState>((set) => ({
    // Toolsbar state
    showFileInfo: false,
    isSelectedMultiItem: false,

    setShowFileInfo: (show) => set({ showFileInfo: show }),
    setIsSelectedMultiItem: (isMulti) => set({ isSelectedMultiItem: isMulti }),

    // Upload state
    filesUpload: [],

    setFilesUpload: (files) => set({ filesUpload: files }),
    addFileUpload: (file) => set((state) => ({ filesUpload: [...state.filesUpload, file] })),
    addManyFileUpload: (files: FileUploadModel[]) => set((state) => ({ filesUpload: [...state.filesUpload, ...files], })),
    updateFileUpload: (id, data) =>
        set((state) => ({
            filesUpload: state.filesUpload.map(f =>
                f.id === id ? { ...f, ...data } : f
            )
        })),
    removeFileUpload: (id) => set((state) => ({ filesUpload: state.filesUpload.filter(file => file.id !== id) })),

}));