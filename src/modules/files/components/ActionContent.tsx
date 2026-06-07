import { useEffect, useState } from 'react';
import '../styles/actionContent.css'

import { useFileStore } from '../store/file.store';

import { deleteItem, favorite } from '../api/file.api';

import CreateFolderPopup from './CreateFolderPopup';
import ShareFilePopup from './ShareFilePopup';
import FileNameEditPopup from './FileNameEditPopup';

import createFolderIcon from '@/assets/icons-menu/create-folder.png';
import createFileIcon from '@/assets/icons-menu/create-file.png';

import downloadIcon from '@/assets/icons-menu/downloads.png';
import deleteIcon from '@/assets/icons-menu/bin.png';
import favoriteIcon from '@/assets/icons-menu/favorite.png';
import favoriteFillIcon from '@/assets/icons-menu/favorite-fill.png';
import shareIcon from '@/assets/icons-menu/send.png';
import editIcon from '@/assets/icons-menu/edit.png';

export default function ActionContent() {
    const selectedIds = useFileStore((s) => s.selectedIds);
    const selectedItem = useFileStore((s) => s.selectedItem)
    const setSelectedItem = useFileStore((s) => s.setSelectedItem)
    const setUpdatedItem = useFileStore((s) => s.setUpdatedItem)
    const clearSelection = useFileStore((s) => s.clearSelection)
    const setDeletedFileIds = useFileStore((s) => s.setDeletedFileIds);
    const currentFolderId = useFileStore((s) => s.currentFolderId)

    const [isSelect, setIsSelect] = useState<boolean>(selectedIds.length > 0);
    const [isSelectedMultiple, setIsSelectedMultiple] = useState<boolean>(selectedIds.length > 1);

    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
    const [isShareFileOpen, setIsShareFileOpen] = useState(false);
    const [isEditNameOpen, setIsEditNameOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false)

    useEffect(() => {
        setIsSelect(selectedIds.length > 0);
        setIsSelectedMultiple(selectedIds.length > 1);
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

    const handleDelete = async () => {
        // window.alert("delete")

        if (selectedIds.length === 0) return;

        try {

            setDeleteLoading(true);

            const deletedIds: string[] = [];

            await Promise.all(

                selectedIds.map(async (id) => {

                    const res = await deleteItem(id);

                    // console.log(res);

                    if (res.file_id) {
                        deletedIds.push(res.file_id);
                    }
                })
            );

            setDeletedFileIds(deletedIds);

            clearSelection();

        } catch (err) {

            console.error(err);

        } finally {

            setDeleteLoading(false);
        }
    }

    const handleFavorite = async () => {
        // window.alert("favorite")
        if(selectedIds.length !== 1) return;
        try {
            const res = await favorite(selectedIds[0])
            // console.log(res);
            if (selectedItem) {
                setUpdatedItem({ ...selectedItem, isFavorite: res.favorite_id || false });
                setSelectedItem({ ...selectedItem, isFavorite: res.favorite_id || false });
            }
        }catch (err) {
            console.error(err)
        }
    }

    const handleShare = async () => {
        // window.alert("share")
        if(selectedIds.length === 0) return;
        setIsShareFileOpen(true);
    }

    const handleEditName = async () => {
        // window.alert("edit name")
        if (selectedIds.length !== 1) return;
        setIsEditNameOpen(true);
    }



    return (
        <div className="action-content">
            <CreateFolderPopup open={isCreateFolderOpen} onClose={() => setIsCreateFolderOpen(false)} parentId={currentFolderId} />
            <FileNameEditPopup open={isEditNameOpen} onClose={() => setIsEditNameOpen(false)} />
            <ShareFilePopup open={isShareFileOpen} onClose={() => setIsShareFileOpen(false)} />

            {selectedIds.length > 1 && (
                <div className="primary-actions">
                    <h4>เลือกไว้ {selectedIds.length} รายการ</h4>
                </div>
            )}
            {
                (!isSelectedMultiple) && (
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
                <button className="action-btn" onClick={handleDownload}>
                    <img src={downloadIcon} alt="Download" />
                </button>
                <button className={`action-btn ${deleteLoading ? 'loading' : ''}`} disabled={!isSelect} onClick={handleDelete}>
                    <img src={deleteIcon} alt="Delete" />
                </button>
                <button className="action-btn" disabled={!isSelect || isSelectedMultiple} onClick={handleFavorite}>
                    <img src={ !isSelect || isSelectedMultiple ? favoriteIcon : selectedItem?.isFavorite ? favoriteFillIcon : favoriteIcon} alt="Favorite" />
                </button>
                <button className="action-btn" disabled={!isSelect} onClick={handleShare}>
                    <img src={shareIcon} alt="Share" />
                </button>
                <button className="action-btn" disabled={!isSelect || isSelectedMultiple} onClick={handleEditName}>
                    <img src={editIcon} alt="Edit" />
                </button>
            </div>
        </div>
    )
}