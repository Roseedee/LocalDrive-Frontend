import "../styles/fileGridView.css"

import { useToolsStore } from "../store/tools.store";
import { useFileStore } from "../store/file.store";

import type { ItemProps } from "../models/file.model";

import FileGridItem from "./FileGridItem";

type Props = {
    items: ItemProps[] | null
    onOpen?: (item: ItemProps) => void
}

export default function FileGridView({ items, onOpen }: Props) {
    const setIsMultiSelectMode = useToolsStore((s) => s.setIsMultiSelectMode);
    const clearSelection = useFileStore((s) => s.clearSelection);

    const handleClickEmptyArea = () => {
        clearSelection();
        setIsMultiSelectMode(false);
    }

    return (
        <div className="file-grid-container" onClick={handleClickEmptyArea} >
            {items?.map((file, index) => (
                <FileGridItem key={index} item={file} onOpen={onOpen} />
            ))}
            {items?.map((file, index) => (
                <FileGridItem key={index} item={file} onOpen={onOpen} />
            ))}
            {items?.map((file, index) => (
                <FileGridItem key={index} item={file} onOpen={onOpen} />
            ))}
            {items?.map((file, index) => (
                <FileGridItem key={index} item={file} onOpen={onOpen} />
            ))}
            {items?.map((file, index) => (
                <FileGridItem key={index} item={file} onOpen={onOpen} />
            ))}
            {items?.map((file, index) => (
                <FileGridItem key={index} item={file} onOpen={onOpen} />
            ))}
        </div>
    )
}