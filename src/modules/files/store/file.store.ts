import { create } from 'zustand'

import type { FileUploadModel } from "../models/itemUpload.model"
import type { FileModel, ItemProps } from '../models/file.model'

interface FileState {
  // Upload
  filesUpload: FileUploadModel[]
  filesUploadSuccess: ItemProps[]

  setFilesUpload: (files: FileUploadModel[]) => void
  addFileUpload: (file: FileUploadModel) => void
  addManyFileUpload: (files: FileUploadModel[]) => void
  updateFileUpload: (id: string, data: Partial<FileUploadModel>) => void
  removeFileUpload: (id: string) => void
  setFilesUploadSuccess: (files: ItemProps[]) => void

  currentPath: string
  setCurrentPath: (path: string) => void

  // Selection
  selectedIds: string[]
  selectedItem: ItemProps | null

  selectOne: (id: string) => void
  toggleSelect: (id: string) => void
  clearSelection: () => void
  setSelectedItem: (item: ItemProps) => void

  // Full view
  isFullViewOpen: boolean
  activeFile: FileModel | null
  updateActiveFile: (file: FileModel) => void
  openFullView: (file: FileModel) => void
  closeFullView: () => void

  deletedFileIds: string[]
  setDeletedFileIds: (ids: string[]) => void
}

export const useFileStore = create<FileState>((set) => ({
  // Upload
  filesUpload: [],
  filesUploadSuccess: [],
  setFilesUpload: (files) => set({ filesUpload: files }),
  setFilesUploadSuccess: (files) => set({ filesUploadSuccess: files }),

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

  currentPath: "/",
  setCurrentPath: (path) => set({ currentPath: path }),

  // Selection
  selectedIds: [],
  selectedItem: null,

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
  setSelectedItem(item) {set({selectedItem: item})},

  // Full view
  isFullViewOpen: false,
  activeFile: null,
  updateActiveFile: (file) => set({ activeFile: file }),
  openFullView: (file) => set({ isFullViewOpen: true, activeFile: file }),
  closeFullView: () => set({ isFullViewOpen: false, activeFile: null }),

  deletedFileIds: [],
  setDeletedFileIds: (ids) => set({ deletedFileIds: ids }),
}))