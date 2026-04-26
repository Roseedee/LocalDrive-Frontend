import { useEffect, useState } from "react";

// import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useFileStore } from "../store/file.store";
import { useToolsStore } from "../store/tools.store";
import { getItemsList } from "../api/file.api";

import FileListView from "../components/FileListView";
import FileGridView from "../components/FileGridView";
import FileSidebar from "../components/FileSidebar";

import type { ItemProps } from "../models/file.model";

export default function FilesPage() {
  const { filesUpload } = useFileStore();
  const { isGridView, showFileInfo } = useToolsStore();

  const [itemList, setItemList] = useState<ItemProps[] | null>(null);

  function mapToItem(item: any): ItemProps {
    const base = {
      id: String(item.id),
      name: item.name,
      type: item.type,
      parentId: item.parent_id ? String(item.parent_id) : undefined,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    };

    if (item.type === "file") {
      return {
        ...base,
        type: "file",
        fileURL: `/api/files/${item.id}`,
        fileType: item.mime_type,
        fileSize: item.size,
        extension: item.name.split('.').pop()
      };
    }

    return {
      ...base,
      type: "folder",
      childrenCount: item.children_count ?? 0
    };
  }

  useEffect(() => {
    const fetchFiles = async () => {
      getItemsList().then((res) => {
        if (res.status) {
          const mapped = res.items.map(mapToItem);

          setItemList(mapped);
        }
      })
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
          <FileGridView items={itemList} onOpen={handleOpen} />
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
          <FileListView items={itemList} onOpen={handleOpen} />
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