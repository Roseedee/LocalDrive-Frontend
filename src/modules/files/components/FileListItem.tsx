import type { ItemProps } from "../models/file.model"
import { useFileItem } from "../hooks/useFileItem"

import { formatFileSize } from "../utils/formatFileSize"
import { iconFile } from "../utils/iconFileType"

type Props = {
    item: ItemProps,
    onOpen?: (item: ItemProps) => void
}

export default function FileListItem({ item, onOpen }: Props) {
    const { isSelected, onClick, onDoubleClick } = useFileItem(item, onOpen);

    const isFolder = item.type === 'folder'

    

    return (
        <div
            className={`file-list-row ${isSelected ? 'selected' : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                onClick(e);
            }}
            onDoubleClick={onDoubleClick}
        >
            <div className="file-list-col name">
                <div className="file-icon">
                    <img src={iconFile(item)} alt="" />
                </div>
                <span className="file-name-text">{item.name}</span>
            </div>

            <div className="file-list-col">
                <img src={''} className="avatar" />
            </div>

            <div className="file-list-col">{item.updatedAt.toDateString()}</div>
            <div className="file-list-col">{!isFolder ? formatFileSize(item.fileSize) : "-"}</div>

            <div className="file-list-col action">
                <button className="menu-btn">⋮</button>
            </div>
        </div>
    )
}