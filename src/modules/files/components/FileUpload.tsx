import '../styles/fileUpload.css'

import { useFileStore } from '../store/file.store';

import cancelIcon from '@/assets/icons/close.png';


export default function FileInfo() {
    const { filesUpload, removeFileUpload } = useFileStore();

    const handleCancelUpload = (id: string) => {
        removeFileUpload(id);
    };

    return (
        <div className="file-upload-container">
            <h4>รายการอัพโหลด{`(${filesUpload.length})`}</h4>
            <div className="file-upload-list">
                {filesUpload.map((file) => (
                    <div key={file.id} className="file-upload-item">
                        <img className='item-preview' src={file.path} />
                        <div className="item-info">
                            <div className='column'>
                                <h5>{file.name}</h5>
                                <p className='tag'>{file.size} bytes</p>
                            </div>
                            {/* <div className="progress-container">
                                <div className="progress-bar"></div>
                            </div> */}
                        </div>
                        <div className="item-btn-cancel" onClick={() => handleCancelUpload(file.id)}>
                            <img src={cancelIcon} alt="Cancel" />
                        </div>
                    </div>
                ))}
                {/* <div className="file-upload-item">
                    <img className='item-preview' src={imgTest1} />
                    <div className="item-info">
                        <h5>test.jpg</h5>
                        <p className='tag'>ขนาดไฟล์: 204800 bytes</p>
                    </div>
                    <div className="item-btn-cancel"><img src={cancelIcon} alt="Cancel" /></div>
                </div> */}
            </div>
            <button className="file-upload-btn">ปิด</button>
        </div>
    )
}