import { useEffect, useState } from "react";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useFileStore } from "../store/file.store";

import File from "../components/File";
import FileInfo from "../components/FileInfo";
import FileUpload from "../components/FileUpload";

import type { ItemProps } from "../models/file.model";

import imgTest1 from '@/assets/test1.jpg';
import imgTest2 from '@/assets/test2.jpg';
import imgTest3 from '@/assets/test3.jpg';

export default function FilesPage() {
  const { filesUpload, showFileInfo } = useFileStore();

  const [itemList, setItemList] = useState<ItemProps[] | null>(null);

  useEffect(() => {
    // Simulate an API call to fetch file list
    const fetchFiles = async () => {
      // Replace this with your actual API call
      setTimeout(() => {
        setItemList([
          {
            id: "1",
            name: "รูปภาพทดสอบ.jpg",
            type: "file",
            fileURL: imgTest1,
            fileType: "image/jpeg",
            fileSize: 102400,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "2",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "3",
            name: "โฟลเดอร์ตัวอย่าง",
            type: "folder",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "4",
            name: "ไฟล์ทั่วไป.txt",
            type: "file",
            fileURL: imgTest3,
            fileType: "image/jpeg",
            fileSize: 51200,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "5",
            name: "เอกสารตัวอย่าง.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "application/pdf",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "6",
            name: "ไฟล์ทั่วไป.txt",
            type: "folder",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]);
      }, 1000);
    };

    fetchFiles();
  }, []);


  // const handleSetExpired = () => {
  //   useAuthStore.getState().expireSession();
  // }

  return (
    <div className="content">
      <div className="file-container">
        {itemList?.map((file, index) => (
          <File key={index} item={file} />
        ))}
      </div>
      {filesUpload.length > 0 ? (
        <FileUpload />
      ) : (
        showFileInfo && (
          <FileInfo />
        )
      )}
    </div>
  );
}