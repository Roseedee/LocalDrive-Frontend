import { useEffect, useState } from "react";

// import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useFileStore } from "../store/file.store";
import { useToolsStore } from "../store/tools.store";
import { getItemsList } from "../api/file.api";

import FileListView from "../components/FileListView";
import FileGridView from "../components/FileGridView";
import FileSidebar from "../components/FileSidebar";

import type { FileModel, ItemProps } from "../models/file.model";
import FileFullViewPopup from "../components/FileFullViewPopup";

export default function FilesPage() {


  const filesUpload = useFileStore((s) => s.filesUpload);
  const isGridView = useToolsStore((s) => s.isGridView);
  const showFileInfo = useToolsStore((s) => s.showFileInfo);
  const openFullView = useFileStore((s) => s.openFullView);
  const activeFile = useFileStore((s) => s.activeFile);
  const updateActiveFile = useFileStore((s) => s.updateActiveFile);
  const filesUploadSuccess = useFileStore((s) => s.filesUploadSuccess);
  const setFilesUploadSuccess = useFileStore((s) => s.setFilesUploadSuccess);
  const deletedFileIds = useFileStore((s) => s.deletedFileIds);
  const setDeletedFileIds = useFileStore((s) => s.setDeletedFileIds);
  const selectedIds = useFileStore((s) => s.selectedIds)
  const setSelectedItem = useFileStore((s) => s.setSelectedItem)

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
        hash: item.hash,
        type: "file",
        fileURL: `/files/${item.id}`,
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
    if(selectedIds.length !== 1) return;

    const tempItem = itemList?.filter((item) => item.id === selectedIds[0])[0] as ItemProps
    setSelectedItem(tempItem)

  }, [selectedIds])

  // update itemList when upload success
  useEffect(() => {

    if (filesUploadSuccess.length > 0) {

      setItemList((prev) => {

        const existingIds = new Set(
          prev?.map(i => i.id)
        );

        const newItems = filesUploadSuccess.filter(
          i => !existingIds.has(i.id)
        );

        const folders =
          (prev || []).filter(i => i.type === "folder");

        const files =
          (prev || []).filter(i => i.type !== "folder");

        return [
          ...folders,
          ...newItems,
          ...files
        ];
      });

      setFilesUploadSuccess([]);

    }

  }, [filesUploadSuccess]);


  // update itemList when delete success
  useEffect(() => {
    if (deletedFileIds.length > 0) {
      setItemList((prev) => prev?.filter(i => !deletedFileIds.includes(i.id)) || null);
      setDeletedFileIds([]);
    }
  }, [deletedFileIds]);

  useEffect(() => {
    const fetchFiles = async () => {
      getItemsList().then((res) => {
        if (res.status) {
          console.log(res);
          const mapped = res.items.map(mapToItem);

          setItemList(mapped);
        }
      })
    };

    fetchFiles();
  }, []);

  const handleOpen = (item: ItemProps) => {
    // window.alert("Open Item " + item.name)
    if (item.type === "file") {
      openFullView(item);
    }
  }

  const handleFullViewPrevious = () => {
    // window.alert("Previous")
    let currentIndex = itemList?.findIndex(i => (i.type === "file" && i.id === activeFile?.id)) ?? -1;
    if (currentIndex > 0) {
      updateActiveFile((itemList![currentIndex - 1]) as FileModel);
    }
  }

  const handleFullViewNext = () => {
    // window.alert("Next")
    let currentIndex = itemList?.findIndex(i => (i.type === "file" && i.id === activeFile?.id)) ?? -1;
    if (currentIndex < (itemList?.length || 0) - 1) {
      updateActiveFile((itemList![currentIndex + 1]) as FileModel);
    }
  }

  return (
    <div className="content">
      <FileFullViewPopup onPrevious={handleFullViewPrevious} onNext={handleFullViewNext} />
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