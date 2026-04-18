import "../styles/fileInfo.css"

import imgTest1 from '@/assets/test1.jpg';

export default function FileInfo() {
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
            <button className="file-info-btn">ปิด</button>
        </>
    )
}