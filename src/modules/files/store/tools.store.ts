import { create } from "zustand";

interface ToolsState {
    isGridView: boolean;
    hasMultipleFilesSelected: boolean;
    showFileInfo: boolean;
    
    setIsGridView: (isGrid: boolean) => void;
    setHasMultipleFilesSelected: (isMulti: boolean) => void;
    setShowFileInfo: (show: boolean) => void;
}

export const useToolsStore = create<ToolsState>((set) => ({
    isGridView: true,
    hasMultipleFilesSelected: false,
    showFileInfo: false,

    setIsGridView: (isGrid) => set({isGridView: isGrid}),
    setHasMultipleFilesSelected: (isMulti) => set({hasMultipleFilesSelected: isMulti}),
    setShowFileInfo: (show) => set({showFileInfo: show}),
}))