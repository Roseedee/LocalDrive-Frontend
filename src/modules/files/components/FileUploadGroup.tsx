import { useState } from 'react';

import { formatFileSize } from '../utils/formatFileSize';

import type { FileUploadModel } from '../models/itemUpload.model';

import arrowIcon from '@/assets/icons/arrow.png'

// import folderSmallIcon from "@/assets/icons-file/folder-small.png"
// import folderIcon from "@/assets/icons-file/folder.png"
// import photoIcon from "@/assets/icons-file/photo.png"
import videoIcon from "@/assets/icons-file/video.png"
import musicIcon from "@/assets/icons-file/sound.png"
import docIcon from "@/assets/icons-file/doc.png"
import pptIcon from "@/assets/icons-file/ppt.png"
import pdfIcon from "@/assets/icons-file/pdf.png"
import xlsIcon from "@/assets/icons-file/xls.png"
import zipIcon from "@/assets/icons-file/zip.png"
import rarIcon from "@/assets/icons-file/rar.png"
// import codeIcon from "@/assets/icons-file/code.png"
import unknownIcon from "@/assets/icons-file/unknown.png"

type Props = {
    items: FileUploadModel[]
}


export default function FileUploadGroup({items} : Props) {
    const [isOpen, setIsOpen] = useState(false);

    const iconFileType = (file: FileUploadModel) => {
        // if (file.type === "folder") return folderSmallIcon;

        const isVideo = file.type?.startsWith("video/");
        if (isVideo) return videoIcon;

        const isAudio = file.type?.startsWith("audio/");
        if (isAudio) return musicIcon;

        const ext = file.name?.split(".").pop()?.toLowerCase();

        const map: Record<string, string> = {
            // image
            // png: photoIcon,
            // jpg: photoIcon,
            // jpeg: photoIcon,
            // gif: photoIcon,
            // webp: photoIcon,
            // svg: photoIcon,

            // video
            // mp4: videoIcon,
            // mov: videoIcon,
            // avi: videoIcon,
            // mkv: videoIcon,
            // webm: videoIcon,

            // audio
            // mp3: musicIcon,
            // wav: musicIcon,
            // ogg: musicIcon,
            // flac: musicIcon,

            // document
            doc: docIcon,
            docx: docIcon,
            txt: docIcon,
            rtf: docIcon,

            // pdf
            pdf: pdfIcon,

            // presentation
            ppt: pptIcon,
            pptx: pptIcon,

            // spreadsheet
            xls: xlsIcon,
            xlsx: xlsIcon,
            csv: xlsIcon,

            // archive
            zip: zipIcon,
            rar: rarIcon,
            tar: zipIcon,
            gz: zipIcon,

            // code (คนใช้บ่อยมาก)
            // js: codeIcon,
            // ts: codeIcon,
            // tsx: codeIcon,
            // jsx: codeIcon,
            // html: codeIcon,
            // css: codeIcon,
            // scss: codeIcon,
            // json: codeIcon,
            // py: codeIcon,
            // java: codeIcon,
            // c: codeIcon,
            // cpp: codeIcon,
            // cs: codeIcon,
            // go: codeIcon,
            // rs: codeIcon,
        };
        return map[ext || ""] || unknownIcon; // fallback
    }

    return (
        <div className={`group-item ${!isOpen && 'collapse'}`}>
            <div className="group-item-header" onClick={()=>{setIsOpen(!isOpen); console.log('collapse')}}>
                <p className='upload-at'>10:20:15</p>
                <hr />
                <img src={arrowIcon} alt="" className='expander' />
            </div>
            <div className="group-item-container">
                {items.map((file) => (
                    <div key={file.id} className="file-upload-item">
                        <div className="file-upload-thumb">
                            {
                                file.type?.startsWith("image/") ? (
                                    <img className='img-preview' src={file.path} alt={file.name} />
                                ) : (
                                    <img className='icon-file' src={iconFileType(file)} alt={file.name} />
                                )
                            }
                        </div>
                        {/* <img className='item-preview' src={previewFile(file)} alt={file.name} /> */}
                        <div className="item-info">
                            <div className='column'>
                                <h5 className='file-name'>{file.name}</h5>
                                <p className='tag'>{formatFileSize(file.size || 0)}</p>
                            </div>
                            <small className='tag'><div className={`point-status ${file.status}`}></div>{file.status}</small>
                        </div>
                        {/* <div className="item-btn-cancel">
                            <img src={} alt="Cancel" />
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}