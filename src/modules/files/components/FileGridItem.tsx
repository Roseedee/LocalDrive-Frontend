import type { ItemProps } from "../models/file.model";
import { useFileItem } from '../hooks/useFileItem';

import folderIcon from "@/assets/icons-file/folder.png";

type Props = {
  item: ItemProps,
  onOpen?: (item: ItemProps) => void
};

export default function FileGridItem({ item, onOpen }: Props) {
  const {isSelected, onClick, onDoubleClick} = useFileItem(item, onOpen);

  const isFile = item.type === "file";

  const getFileIcon = () => {
    if (!isFile) return folderIcon;

    if (item.fileType.startsWith("image/")) return item.fileURL;
    if (item.fileType.includes("pdf")) return "@assets/icons/pdf.png";

    return "";
  };

  return (
    <div
      className={`file-item ${isFile ? "file" : "folder"} ${isSelected ? "selected" : ""}`}
      title={
        isFile
          ? `ชื่อไฟล์: ${item.name}\nขนาดไฟล์: ${item.fileSize} bytes\nประเภทไฟล์: ${item.fileType}`
          : `โฟลเดอร์: ${item.name}`
      }
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {/* {isUploading && (
        <div className="file-progress">
          <div className="progress">
            <div
              className="progress-value"
              style={{ width: progress + "%" }}
            ></div>
          </div>
          <h5>{progress}%</h5>
        </div>
      )} */}

      <div className="file-icon-container">
        <img className="image-icon" src={getFileIcon()} />
      </div>

      <h5>{item.name}</h5>
    </div>
  );
}