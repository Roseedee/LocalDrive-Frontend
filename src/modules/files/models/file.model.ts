export type ItemType = "file" | "folder";

export interface BaseItem {
  id: string;
  name: string;
  type: ItemType;

  parentId?: string;      // folder ที่อยู่
  path?: string;          // optional ถ้าใช้ full path

  createdAt: Date;
  updatedAt: Date;
}

export interface FileModel extends BaseItem {
  hash: string;
  type: "file";

  fileURL: string;
  fileType: string;       // เช่น "image/png"
  fileSize: number;       // bytes

  extension?: string;     // เช่น .png
}

export interface FolderModel extends BaseItem {
  type: "folder";

  childrenCount?: number; // ไว้โชว์จำนวนไฟล์
}

export type ItemProps = FileModel | FolderModel;