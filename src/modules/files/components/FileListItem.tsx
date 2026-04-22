import type { ItemProps } from "../models/file.model"
import { useFileItem } from "../hooks/useFileItem"

import folderIcon from "@/assets/icons-file/folder-small.png"
import photoIcon from "@/assets/icons-file/photo.png"
import docIcon from "@/assets/icons-file/doc.png"
import pptIcon from "@/assets/icons-file/ppt.png"
import pdfIcon from "@/assets/icons-file/pdf.png"
import xlsIcon from "@/assets/icons-file/xls.png"
import zipIcon from "@/assets/icons-file/zip.png"
import rarIcon from "@/assets/icons-file/rar.png"

type Props = {
    item: ItemProps,
    onOpen?: (item: ItemProps) => void
}

export default function FileListItem({ item, onOpen}: Props) {
    const { isSelected, onClick, onDoubleClick } = useFileItem(item, onOpen);

    const isFolder = item.type === 'folder'

    const getFileIcon = (file: ItemProps) => {
        if (file.type === "folder") return folderIcon;

        const ext = file.name.split(".").pop()?.toLowerCase();

        const map: Record<string, string> = {
            // image
            png: photoIcon,
            jpg: photoIcon,
            jpeg: photoIcon,
            gif: photoIcon,
            webp: photoIcon,

            // document
            doc: docIcon,
            docx: docIcon,

            // pdf
            pdf: pdfIcon,

            // powerpoint
            ppt: pptIcon,
            pptx: pptIcon,

            // excel
            xls: xlsIcon,
            xlsx: xlsIcon,

            // archive
            zip: zipIcon,
            rar: rarIcon,
        };

        return map[ext || ""] || docIcon; // fallback
    };

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
                    <img src={getFileIcon(item)} alt="" />
                </div>
                <span className="file-name-text">{item.name}</span>
            </div>

            <div className="file-list-col">
                <img src={''} className="avatar" />
            </div>

            <div className="file-list-col">{item.updatedAt.toDateString()}</div>
            <div className="file-list-col">{!isFolder ? item.fileSize + "B" : "-"}</div>

            <div className="file-list-col action">
                <button className="menu-btn">⋮</button>
            </div>
        </div>
    )
}