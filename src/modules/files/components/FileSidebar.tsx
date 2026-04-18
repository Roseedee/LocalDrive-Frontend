import { useState } from "react"

import "../styles/fileSidebar.css"

import { useFileStore } from "../store/file.store"
import FileInfo from "./FileInfo";
import FileUpload from "./FileUpload";

export default function FileSidebar() {
    const { filesUpload, showFileInfo } = useFileStore();

    const [activeTab, setActiveTab] = useState<'info' | 'upload'>('info')

    const hasUpload = filesUpload.length > 0;
    const isForceInfo = showFileInfo && !hasUpload;
    const isTabMode = showFileInfo && hasUpload;
    const isUploadOnly = !showFileInfo && hasUpload;

    return (
        <div className="right-sidebar-container">
            {isTabMode && (
              <div className="right-sidebar-tab">
                <div className={`right-sidebar-tab-item ${activeTab === "info" && "active"}`} onClick={() => setActiveTab("info")}>
                  <h5>รายละเอียด</h5>
                </div>
                <div className={`right-sidebar-tab-item ${activeTab === "upload" && "active"}`} onClick={() => setActiveTab("upload")}>
                  <h5>รายการอัพโหลดไฟล์</h5>
                </div>
              </div>
            )}
            <div className="right-sidebar-content">
              {isForceInfo && <FileInfo />}
              {isTabMode && activeTab === "info" && <FileInfo />}
              {isTabMode && activeTab === "upload" && <FileUpload />}
              {isUploadOnly && <FileUpload />}

            </div>
          </div>
    )
}