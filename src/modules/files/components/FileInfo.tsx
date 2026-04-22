import "../styles/fileInfo.css"

// import { useFileStore } from "../store/file.store";
import { useToolsStore } from "../store/tools.store";

import imgTest1 from '@/assets/test/test1.jpg';

export default function FileInfo() {
    // const {} = useFileStore();
    const setShowFileInfo = useToolsStore((s) => s.setShowFileInfo);
    return (
        <>
            <div className="file-info-header">
                <h4>File Name.exe</h4>
            </div>
            <div className="file-info-preview">
                {
                    <img className='image-icon' src={imgTest1} />
                }
                <p className='file-type'>png</p>
                {/* <div className="file-info-preview-hover">
                  <img src={zoomInIcon} alt="" />
                </div> */}
            </div>
            <div className="file-info-meta-data">
                <div className="meta-data-item">
                    <p>File Type</p>
                    <p>png</p>
                </div>
                <div className="meta-data-item">
                    <p>Size</p>
                    <p>1024 KB</p>
                </div>
                <div className="meta-data-item">
                    <p>File Type</p>
                    <p>png</p>
                </div>
                <div className="meta-data-item">
                    <p>Size</p>
                    <p>1024 KB</p>
                </div>
            </div>
            <button className="file-info-btn" onClick={() => setShowFileInfo(false)}>ปิด</button>
        </>
    )
}