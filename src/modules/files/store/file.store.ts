import { create } from 'zustand';

import type { FileUploadModel } from "../models/itemUpload.model";

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
    addManyFileUpload: (files: FileUploadModel[]) =>
        set((state) => ({
            filesUpload: [...state.filesUpload, ...files],
        })),
    removeFileUpload: (id) => set((state) => ({ filesUpload: state.filesUpload.filter(file => file.id !== id) })),

}));