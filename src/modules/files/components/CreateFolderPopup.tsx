import { useState } from 'react';
import '../styles/createFolderPopup.css';
import { Overlay } from "./Overlay";

import { validateFolderName } from '../utils/validateFolderName';
import { createFolder } from '../api/file.api';

import closeIcon from '@/assets/icons/close-black.png';

type CreateFolderPopupProps = {
    open: boolean;
    onClose: () => void;
    parentId?: string | null;
};

export default function CreateFolderPopup({ open, onClose, parentId = null }: CreateFolderPopupProps) {
    const [folderName, setFolderName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length > 255) return;

        setFolderName(value);
        setError(validateFolderName(value));
    };

    const handleCreateFolder = async () => {
        const err = validateFolderName(folderName);

        if (err) {
            setError(err);
            return;
        }

        setLoading(true);
        createFolder(folderName, parentId || null).then(() => {
            setFolderName("");
            onClose();
        }).catch(() => {
            setLoading(false);
            setError("เกิดข้อผิดพลาดในการสร้างโฟลเดอร์");
        });

    };

    return (
        <Overlay open={open} onClose={onClose}>
            <div className="overlay-card">
                <div className="row between">
                    <h3>Create Folder</h3>
                    <button onClick={onClose} className="popup-close-btn">
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>

                <div className="input-container-popup">
                    <input
                        type="text"
                        id="folder-name"
                        placeholder="Enter folder name"
                        value={folderName}
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