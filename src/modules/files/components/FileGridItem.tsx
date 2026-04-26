import type { ItemProps } from "../models/file.model";
import { useFileItem } from '../hooks/useFileItem';
import { api } from "@/shared/lib/axios";

import folderIcon from "@/assets/icons-file/folder.png";
import { useEffect, useState } from "react";

type Props = {
  item: ItemProps,
  onOpen?: (item: ItemProps) => void
};

export default function FileGridItem({ item, onOpen }: Props) {
  const { isSelected, onClick, onDoubleClick } = useFileItem(item, onOpen);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const isFile = item.type === "file";

  useEffect(() => {
  if (item.type !== "file") return;
  if (!item.fileType.startsWith("image/")) return;

  const loadImage = async () => {
    const res = await api.get(`/files/${item.id}`, {
      responseType: "blob"
    });

    const url = URL.createObjectURL(res.data);
    setImageURL(url);
  };

  loadImage();
}, [item.id]);

  // const getFileIcon = () => {
  //   if (!isFile) return folderIcon;
  //   // console.log(item.fileURL)

  //   if (item.fileType.startsWith("image/")) return getURL(item.id);

  //   return folderIcon;
  // };

  return (
    <div
      className={`file-item ${isFile ? "file" : "folder"} ${isSelected ? "selected" : ""}`}
      title={
        isFile
          ? `ชื่อไฟล์: ${item.name}\nขนาดไฟล์: ${item.fileSize} bytes\nประเภทไฟล์: ${item.fileType}`
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

      <div className="file-icon-container">
        <img className="image-icon" src={imageURL || ""} />
      </div>

      <h5>{item.name}</h5>
    </div>
  );
}