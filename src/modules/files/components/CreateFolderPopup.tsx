import { useEffect, useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import '../styles/createFolderPopup.css';
import { Overlay } from "./Overlay";
import type { ItemProps } from '../models/file.model';

import { useFileStore } from '../store/file.store';

import { validateFolderName } from '../utils/validateFolderName';
import { createFolder } from '../api/file.api';

import closeIcon from '@/assets/icons/close-black.png';

type CreateFolderPopupProps = {
    open: boolean;
    onClose: () => void;
    parentId?: string | null;
};

export default function CreateFolderPopup({ open, onClose, parentId = null }: CreateFolderPopupProps) {
    const setFilesUploadSuccess = useFileStore((s) => s.setFilesUploadSuccess)

    const inputRef = useRef<HTMLInputElement>(null)
    const [folderName, setFolderName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function mapToItem(item: any): ItemProps {
        const base = {
            id: String(item.id),
            name: item.name,
            type: item.type,
            parentId: item.parent_id ? String(item.parent_id) : undefined,
            createdAt: item.created_at ? new Date(item.created_at) : new Date(),
            updatedAt: item.updated_at ? new Date(item.updated_at) : new Date(),
        };

        if (item.type === "file") {

            return {
                ...base,
                publicId: item.public_id,
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
            publicId: item.public_id,
            childrenCount: item.children_count ?? 0
        };
    }

    useEffect(() => {
        if(open) {
            inputRef.current?.focus();
        }
    }, [open])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length > 255) return;

        setFolderName(value);
        setError(validateFolderName(value));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            handleCreateFolder();
        }
    }

    const handleCreateFolder = async () => {
        const err = validateFolderName(folderName);

        if (err) {
            setError(err);
            return;
        }

        try {
            setLoading(true);
            const res = await createFolder(folderName, parentId || null)
            console.log(res)
            if (res.status) {
                setFolderName("");
                const mapped = res.items.map(mapToItem);
                setFilesUploadSuccess(mapped);
                onClose();
            }

        } catch (err) {
            console.error(err)
            setLoading(false);
            setError("เกิดข้อผิดพลาดในการสร้างโฟลเดอร์");
        } finally {
            setFolderName("");
            setLoading(false)
            onClose();
        }
    };

    return (
        <Overlay open={open} onClose={onClose}>
            <div className="overlay-card">
                <div className="overlay-card-header">
                    <h3>Create Folder</h3>
                    <button onClick={onClose} className="popup-close-btn">
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>

                <div className="input-container-popup">
                    <input
                        ref={inputRef}
                        type="text"
                        id="folder-name"
                        placeholder="Enter folder name"
                        value={folderName}
                        onKeyDown={handleKeyDown}
                        onChange={onInputChange}
                        disabled={loading}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                <div className="btn-container-popup">
                    <button className="cancel" onClick={onClose} disabled={loading}>
                        ยกเลิก
                    </button>
                    <button
                        className="confirm"
                        onClick={handleCreateFolder}
                        disabled={loading || !!validateFolderName(folderName)}
                    >
                        {loading ? "กำลังสร้าง..." : "สร้าง"}
                    </button>
                </div>
            </div>
        </Overlay>
    );
}