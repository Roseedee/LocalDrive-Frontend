import '../styles/fileUpload.css'

import { uploadFileByID } from '../api/file.api';

import { useFileStore } from '../store/file.store';

import cancelIcon from '@/assets/icons/close.png';


export default function FileUpload() {
    const { filesUpload, setFilesUpload, removeFileUpload } = useFileStore();

    const handleCancelUpload = (id: string) => {
        removeFileUpload(id);
    };

    const startUpload = async () => {

        console.log("Start Upload")
        const { filesUpload } = useFileStore.getState();

        for(const file of filesUpload) {
            if(file.status === "pending") {
                await uploadFileByID(file.id)
            }
        }
    }

    // const handleTestUpload = async () => {
    //     console.log('Starting test upload...');
    //     const res = await uploadFile();
    //     console.log('Upload response:', res);
    // }

    return (
        <>
            <div className="row center between">
                <h4>รายการอัพโหลด{`(${filesUpload.filter(f => f.status==='pending').length})`}</h4>
                <span className='file-upload-text-btn-clear' onClick={() => setFilesUpload([])}>ล้าง</span>
            </div>
            <div className="file-upload-list">
                {filesUpload.map((file) => (
                    <div key={file.id} className="file-upload-item">
                        <img className='item-preview' src={file.path} />
                        <div className="item-info">
                            <div className='column'>
                                <h5 className='file-name'>{file.name}</h5>
                                <p className='tag'>{file.size} bytes</p>
                            </div>
                            {
                                file.status === 'uploading' ? (
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: `${file.progress}%` }}></div>
                                    </div>
                                ) : (
                                    <small className='tag'><div className={`point-status ${file.status}`}></div>{file.status}</small>
                                )
                            }
                        </div>
                        <div className="item-btn-cancel" onClick={() => handleCancelUpload(file.id)}>
                            <img src={cancelIcon} alt="Cancel" />
                        </div>
                    </div>
                ))}
            </div>
            <button className="file-upload-btn" onClick={() => startUpload()}>ทดสอบอัพโหลด</button>
            <button className="file-upload-btn">ปิด</button>
        </>
    )
}