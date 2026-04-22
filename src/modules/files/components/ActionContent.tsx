import { useEffect, useState } from 'react';
import '../styles/actionContent.css'

import { useFileStore } from '../store/file.store';

import createFolderIcon from '@/assets/icons-menu/create-folder.png';
import createFileIcon from '@/assets/icons-menu/create-file.png';

import downloadIcon from '@/assets/icons-menu/downloads.png';
import deleteIcon from '@/assets/icons-menu/bin.png';
import favoriteIcon from '@/assets/icons-menu/favorite.png';
import shareIcon from '@/assets/icons-menu/send.png';
import editIcon from '@/assets/icons-menu/edit.png';

export default function ActionContent() {
    const selectedIds = useFileStore((s) => s.selectedIds);
    const [isSelect, setIsSelect] = useState<boolean>(selectedIds.length > 0);

    useEffect(() => {
        setIsSelect(selectedIds.length > 0);
    }, [selectedIds])

    const handleDownload = async () => {
        window.alert("download")
    }

    const handleDelete = () => {
        window.alert("delete")
    }

    const handleFavorite = async () => {
        window.alert("favorite")
    }

    const handleShare = async () => {
        window.alert("share")
    }

    const handleEditName = async () => {
        window.alert("edit name")
    }



    return (
        <div className="action-content">

            {selectedIds.length > 1 && (
                    <div className="primary-actions">
                        <h4>เลือกไว้ {selectedIds.length} รายการ</h4>
                    </div>
            )}
            {
                (!(selectedIds.length > 1)) && (
                    <div className="primary-actions">
                        <button className="action-btn">
                            <img src={createFolderIcon} alt="Create Folder" />
                            <span>สร้างโฟลเดอร์</span>
                        </button>
                        <button className="action-btn">
                            <img src={createFileIcon} alt="Create File" />
                            <span>สร้างไฟล์</span>
                        </button>
                    </div>
                )
            }
            <div className="selection-actions">
                <button className="action-btn loading" onClick={handleDownload}>
                    <img src={downloadIcon} alt="Download" />
                </button>
                <button className="action-btn" disabled={!isSelect} onClick={handleDelete}>
                    <img src={deleteIcon} alt="Delete" />
                </button>
                <button className="action-btn" disabled={!isSelect} onClick={handleFavorite}>
                    <img src={favoriteIcon} alt="Favorite" />
                </button>
                <button className="action-btn" disabled={!isSelect} onClick={handleShare}>
                    <img src={shareIcon} alt="Share" />
                </button>
                <button className="action-btn" disabled={!isSelect} onClick={handleEditName}>
                    <img src={editIcon} alt="Edit" />
                </button>
            </div>
        </div>
    )
}