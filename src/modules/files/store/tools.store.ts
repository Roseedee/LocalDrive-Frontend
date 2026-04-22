import { create } from "zustand";

interface ToolsState {
    isGridView: boolean;
    isMultiSelectMode: boolean;
    showFileInfo: boolean;
    
    setIsGridView: (isGrid: boolean) => void;
    setIsMultiSelectMode: (isMulti: boolean) => void;
    setShowFileInfo: (show: boolean) => void;
}

export const useToolsStore = create<ToolsState>((set) => ({
    isGridView: true,
    isMultiSelectMode: false,
    showFileInfo: false,

    setIsGridView: (isGrid) => set({isGridView: isGrid}),
    setIsMultiSelectMode: (isMulti) => set({isMultiSelectMode: isMulti}),
    setShowFileInfo: (show) => set({showFileInfo: show}),
}))