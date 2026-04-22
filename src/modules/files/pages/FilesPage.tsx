import { useEffect, useState } from "react";

// import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useFileStore } from "../store/file.store";
import { useToolsStore } from "../store/tools.store";

import FileListView from "../components/FileListView";
import FileGridView from "../components/FileGridView";
import FileSidebar from "../components/FileSidebar";

import type { ItemProps } from "../models/file.model";

// import arrowIcon from "@/assets/icons/arrow.png"

import imgTest1 from '@/assets/test/test1.jpg';
import imgTest2 from '@/assets/test/test2.jpg';
import imgTest3 from '@/assets/test/test3.jpg';

export default function FilesPage() {
  const { filesUpload } = useFileStore();
  const { isGridView, showFileInfo } = useToolsStore();

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
          },
          {
            id: "7",
            name: "ไฟล์ทั่วไป.txt",
            type: "folder",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "8",
            name: "ไฟล์ทั่วไป.txt",
            type: "folder",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "9",
            name: "ไฟล์ทั่วไป.txt",
            type: "folder",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "10",
            name: "ไฟล์ทั่วไป.txt",
            type: "folder",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "11",
            name: "ไฟล์ทั่วไป.txt",
            type: "folder",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "12",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "13",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "14",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "15",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "16",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "17",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "18",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "19",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "20",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "21",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "22",
            name: "เอกสาร.pdf",
            type: "file",
            fileURL: imgTest2,
            fileType: "image/jpeg",
            fileSize: 204800,
            createdAt: new Date(),
            updatedAt: new Date()
          },

        ]);
      }, 1000);
    };

    fetchFiles();
  }, []);

  const handleOpen = (item: ItemProps) => {
    window.alert("Open Item " + item.name)
  }

  return (
    <div className="content">
      {
        isGridView && (
          <FileGridView items={itemList} onOpen={handleOpen}/>
        )
      }

      {/* grid view group by */}
      {/* <div className="file-container group-by">
        <div className="file-group">
          <div className="file-group-header">
            <h4>Folder</h4>
            <div className="file-group-grid"></div>
          </div>
          <div className="file-group-list">
            {itemList?.map((file, index) => (
              <File key={index} item={file} />
            ))}
          </div>
        </div>
        <div className={`file-group ${isShow ? '' : 'hide'}`}>
          <div className="file-group-header" onClick={() => setIsShow(!isShow)}>
            <img src={arrowIcon} alt="" />
            <h4>File</h4>
            <div className="file-group-grid"></div>
          </div>
          <div className="file-group-list">
            {itemList?.map((file, index) => (
              <File key={index} item={file} />
            ))}
          </div>
        </div>
      </div> */}
      {
        !isGridView && (
          <FileListView items={itemList} onOpen={handleOpen}/>
        )
      }
      {
        (showFileInfo || filesUpload.length > 0) && (
          <FileSidebar />
        )
      }
    </div>
  );
}