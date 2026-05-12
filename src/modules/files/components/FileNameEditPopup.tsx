import { useEffect, useState } from "react";
import { Overlay } from "./Overlay";

import { useFileStore } from "../store/file.store";

import closeIcon from '@/assets/icons/close-black.png';

type FileNameEditPopupProps = {
    open: boolean;
    onClose: () => void;
}

export default function FileNameEditPopup({ open, onClose }: FileNameEditPopupProps) {
    const selectedItem = useFileStore((s) => s.selectedItem)

    const [fileName, setFileName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(selectedItem)
        setFileName(selectedItem?.name || "")
    }, [selectedItem])

    const handleEditName = async () => {
        onClose();
        setError("");
        setLoading(false)
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