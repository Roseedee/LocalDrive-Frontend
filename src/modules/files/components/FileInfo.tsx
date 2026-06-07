import "../styles/fileInfo.css"

// import { useFileStore } from "../store/file.store";
import { useToolsStore } from "../store/tools.store";
import { useFileStore } from "../store/file.store";

import { formatFileSize } from "../utils/formatFileSize";

import imgTest1 from '@/assets/test/test1.jpg';

export default function FileInfo() {
    const setShowFileInfo = useToolsStore((s) => s.setShowFileInfo);
    const selectedItem = useFileStore((s) => s.selectedItem)
    const isFile = selectedItem?.type === "file";
    return (
        <>
            <div className="file-info-header">
                <h4>{selectedItem?.name}</h4>
            </div>
            <div className="file-info-preview">
                {
                    <img className='image-icon' src={imgTest1} />
                }
                <p className='file-type'>{ isFile ? selectedItem?.fileType : "" }</p>
                {/* <div className="file-info-preview-hover">
                  <img src={zoomInIcon} alt="" />
                </div> */}
            </div>
            <div className="file-info-meta-data">
                <div className="meta-data-item">
                    <p>File Type</p>
                    <p>{isFile ? selectedItem?.extension : ""}</p>
                </div>
                <div className="meta-data-item">
                    <p>Size</p>
                    <p>{ isFile ? formatFileSize(selectedItem?.fileSize) : "" }</p>
                </div>
            </div>
            <button className="file-info-btn" onClick={() => setShowFileInfo(false)}>ปิด</button>
        </>
    )
}