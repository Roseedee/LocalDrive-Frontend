import { useEffect, useState } from "react";
import { Overlay } from "./Overlay";

import { useFileStore } from "../store/file.store";

import { patchItem } from "../api/file.api";

import { getFileExtension } from "../utils/getFileExtension";

import closeIcon from '@/assets/icons/close-black.png';

type FileNameEditPopupProps = {
    open: boolean;
    onClose: () => void;
}

export default function FileNameEditPopup({ open, onClose }: FileNameEditPopupProps) {
    const selectedItem = useFileStore((s) => s.selectedItem)
    const setUpdatedItem = useFileStore((s) => s.setUpdatedItem)

    const [fileName, setFileName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isFile, setIsFile] = useState(false)

    useEffect(() => {
        // console.log(selectedItem)
        setFileName(selectedItem?.name.split('.')[0] || "")
        setIsFile(selectedItem?.type === 'file')
    }, [selectedItem])

    const handleEditName = async () => {
        if (!selectedItem) return;
        setError(null);
        
        const ext = getFileExtension(selectedItem?.name || '');
        
        const finalName = isFile && ext
        ? `${fileName}.${ext}`
        : fileName;
        
        try {
            setLoading(true);

            const res = await patchItem(
                selectedItem.id,
                { name: finalName }
            );

            if (res.status) {
                setUpdatedItem({
                    ...selectedItem,
                    name: finalName
                });

                onClose();
            }
        } catch (err) {
            console.error(err);
            setError("ไม่สามารถแก้ไขชื่อไฟล์ได้");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Overlay open={open} onClose={onClose}>
            <div className="overlay-card">
                <div className="row between">
                    <h3>แก้ไขชื่อไฟล์</h3>
                    <button onClick={onClose} className="popup-close-btn">
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>

                <div className="input-container-popup">
                    <input
                        type="text"
                        id="file-name"
                        placeholder="Enter file name"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                <div className="btn-container-popup">
                    <button className="cancel" onClick={onClose}>
                        ยกเลิก
                    </button>
                    <button
                        className="confirm"
                        onClick={handleEditName}
                    // disabled={loading || !!validateFolderName(folderName)}
                    >
                        {loading ? "กำลังสร้าง..." : "สร้าง"}
                    </button>
                </div>
            </div>
        </Overlay>
    )
}