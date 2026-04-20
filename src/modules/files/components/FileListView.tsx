import "../styles/fileListView.css"

import type { ItemProps } from "../models/file.model"

import folderIcon from "@/assets/icons-file/folder-small.png"
import photoIcon from "@/assets/icons-file/photo.png"
import docIcon from "@/assets/icons-file/doc.png"
import pptIcon from "@/assets/icons-file/ppt.png"
import pdfIcon from "@/assets/icons-file/pdf.png"
import xlsIcon from "@/assets/icons-file/xls.png"
import zipIcon from "@/assets/icons-file/zip.png"
import rarIcon from "@/assets/icons-file/rar.png"


type Props = {
    items: ItemProps[] | null
}

export default function FileListView({ items }: Props) {

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
        <div className="file-list">
            <div className="file-list-header">
                <div className="file-list-col name">ชื่อ</div>
                <div className="file-list-col">เจ้าของ</div>
                <div className="file-list-col">วันที่แก้ไข</div>
                <div className="file-list-col">ขนาดไฟล์</div>
                <div className="file-list-col action"></div>
            </div>

            {items?.map((file) => (
                <div key={file.id} className="file-list-row">
                    <div className="file-list-col name">
                            <div className="file-icon">
                                <img src={getFileIcon(file)} alt="" />
                            </div>
                            <span className="file-name-text">;aljsdp;fljas;ldjnf;alsjd;fljas;dlfja;lsdjf;alkjsdf;lakjsd;flkjas;dlfkj</span>
                    </div>

                    <div className="file-list-col">
                        <img src={''} className="avatar" />
                    </div>

                    <div className="file-list-col">{file.updatedAt.toDateString()}</div>
                    <div className="file-list-col">{file.type === "file" ? file.fileSize + "B" : "-"}</div>

                    <div className="file-list-col action">
                        <button className="menu-btn">⋮</button>
                    </div>
                </div>
            ))}
        </div>
    )
}