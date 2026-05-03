import { create } from 'zustand'

import type { FileUploadModel } from "../models/itemUpload.model"

interface FileState {
  // Upload
  filesUpload: FileUploadModel[]

  setFilesUpload: (files: FileUploadModel[]) => void
  addFileUpload: (file: FileUploadModel) => void
  addManyFileUpload: (files: FileUploadModel[]) => void
  updateFileUpload: (id: string, data: Partial<FileUploadModel>) => void
  removeFileUpload: (id: string) => void

  // Selection
  selectedIds: string[]

  selectOne: (id: string) => void
  toggleSelect: (id: string) => void
  clearSelection: () => void

  // Full view
  isFullViewOpen: boolean
  openFullView: () => void
  closeFullView: () => void
}

export const useFileStore = create<FileState>((set) => ({
  // Upload
  filesUpload: [],

  setFilesUpload: (files) => set({ filesUpload: files }),

  addFileUpload: (file) =>
    set((state) => ({
      filesUpload: [...state.filesUpload, file],
    })),

  addManyFileUpload: (files) =>
    set((state) => ({
      filesUpload: [...state.filesUpload, ...files],
    })),

  updateFileUpload: (id, data) =>
    set((state) => ({
      filesUpload: state.filesUpload.map((f) =>
        f.id === id ? { ...f, ...data } : f
      ),
    })),

  removeFileUpload: (id) =>
    set((state) => ({
      filesUpload: state.filesUpload.filter((f) => f.id !== id),
    })),

  // Selection
  selectedIds: [],

  selectOne: (id) =>
    set({
      selectedIds: [id],
    }),

  toggleSelect: (id) =>
    set((state) => {
      const exists = state.selectedIds.includes(id)

      return {
        selectedIds: exists
          ? state.selectedIds.filter((x) => x !== id)
          : [...state.selectedIds, id],
      }
    }),

  clearSelection: () => set({ selectedIds: [] }),

  // Full view
  isFullViewOpen: false,
  openFullView: () => set({ isFullViewOpen: true }),
  closeFullView: () => set({ isFullViewOpen: false }),
}))