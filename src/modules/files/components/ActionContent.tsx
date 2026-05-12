import { useEffect, useState } from 'react';
import '../styles/actionContent.css'

import { useFileStore } from '../store/file.store';

import { deleteItem } from '../api/file.api';

import CreateFolderPopup from './CreateFolderPopup';
import FileNameEditPopup from './FileNameEditPopup';

import createFolderIcon from '@/assets/icons-menu/create-folder.png';
import createFileIcon from '@/assets/icons-menu/create-file.png';

import downloadIcon from '@/assets/icons-menu/downloads.png';
import deleteIcon from '@/assets/icons-menu/bin.png';
import favoriteIcon from '@/assets/icons-menu/favorite.png';
import shareIcon from '@/assets/icons-menu/send.png';
import editIcon from '@/assets/icons-menu/edit.png';

export default function ActionContent() {
    const selectedIds = useFileStore((s) => s.selectedIds);
    const setDeletedFileIds = useFileStore((s) => s.setDeletedFileIds);
    const [isSelect, setIsSelect] = useState<boolean>(selectedIds.length > 0);

    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
    const [isEditNameOpen, setIsEditNameOpen] = useState(false);
    
    useEffect(() => {
        setIsSelect(selectedIds.length > 0);
    }, [selectedIds])

    const handleCreateFolder = () => {
        // window.alert("create folder")
        setIsCreateFolderOpen(true);
    }

    const handleCreateFile = () => {
        window.alert("create file")
    }

    const handleDownload = async () => {
        window.alert("download")
    }

    const handleDelete = () => {
        // window.alert("delete")
        if (selectedIds.length === 0) return;

        selectedIds.forEach(async (id) => {
            const deletedIds: string[] = [];
            await deleteItem(id).then((res) => {
                // console.log(res)
                if (res.file_id) {
                    deletedIds.push(res.file_id);
                }
            }).catch((err) => {
                console.log(err)
            });
            setDeletedFileIds(deletedIds);
        });
    }

    const handleFavorite = async () => {
        window.alert("favorite")
    }

    const handleShare = async () => {
        window.alert("share")
    }

    const handleEditName = async () => {
        // window.alert("edit name")
        if (selectedIds.length !== 1) return;
        setIsEditNameOpen(true);
    }



    return (
        <div className="action-content">
            <CreateFolderPopup open={isCreateFolderOpen} onClose={() => setIsCreateFolderOpen(false)} />
            <FileNameEditPopup open={isEditNameOpen} onClose={() => setIsEditNameOpen(false)} />

            {selectedIds.length > 1 && (
                <div className="primary-actions">
                    <h4>เลือกไว้ {selectedIds.length} รายการ</h4>
                </div>
            )}
            {
                (!(selectedIds.length > 1)) && (
                    <div className="primary-actions">
                        <button className="action-btn" onClick={handleCreateFolder}>
                            <img src={createFolderIcon} alt="Create Folder" />
                            <span>สร้างโฟลเดอร์</span>
                        </button>
                        <button className="action-btn" onClick={handleCreateFile}>
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