import '../styles/file.css'

import type { ItemProps } from "../models/file.model";

import folderIcon from "@/assets/icons/folder_1.png";

type Props = {
  item: ItemProps;
  isUploading?: boolean;
  progress?: number;
};

export default function File({ item, isUploading, progress = 0 }: Props) {

  const isFile = item.type === "file";

  const getFileIcon = () => {
    if (!isFile) return folderIcon;

    if (item.fileType.startsWith("image/")) return item.fileURL;
    if (item.fileType.includes("pdf")) return "@assets/icons/pdf.png";

    return "";
  };

  return (
    <div
      className={`file-item ${isFile ? "file" : "folder"}`}
      title={
        isFile
          ? `ชื่อไฟล์: ${item.name}\nขนาดไฟล์: ${item.fileSize} bytes\nประเภทไฟล์: ${item.fileType}`
          : `โฟลเดอร์: ${item.name}`
      }
    >
      {isUploading && (
        <div className="file-progress">
          <div className="progress">
            <div
              className="progress-value"
              style={{ width: progress + "%" }}
            ></div>
          </div>
          <h5>{progress}%</h5>
        </div>
      )}

      <div className="file-icon-container">
        <img className="image-icon" src={getFileIcon()} />
      </div>

      <h5>{item.name}</h5>
    </div>
  );
}