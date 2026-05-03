import type { ItemProps } from "../models/file.model";
import { useFileItem } from '../hooks/useFileItem';

import { formatFileSize } from "../utils/formatFileSize";
import { iconFile } from "../utils/iconFileType";

type Props = {
  item: ItemProps,
  onOpen?: (item: ItemProps) => void
};

export default function FileGridItem({ item, onOpen }: Props) {
  const { isSelected, onClick, onDoubleClick } = useFileItem(item, onOpen);
  const isFile = item.type === "file";
  const isImage = isFile && item.fileType?.startsWith("image/");

  return (
    <div
      className={`file-item ${isFile ? "file" : "folder"} ${isSelected ? "selected" : ""}`}
      title={
        isFile
          ? `ชื่อไฟล์: ${item.name}\nขนาดไฟล์: ${formatFileSize(item.fileSize)}\nประเภทไฟล์: ${item.fileType}`
          : `โฟลเดอร์: ${item.name}`
      }
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
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

      <div className={`file-icon-container ${isImage ? "image-thumb" : ""}`}>
        {
          isImage ? (
            <img className="image-thumb" src={iconFile(item)} alt={item.name} />
          ) : (
            <img className="file-icon" src={iconFile(item)} alt={item.name} />
          )
        }
      </div>

      <h5>{item.name}</h5>
    </div>
  );
}