import type { ItemProps } from "../models/file.model"
import { useToolsStore } from "../store/tools.store"
import { useThumbnail } from "@/shared/lib/useThumbnail";

import folderSmallIcon from "@/assets/icons-file/folder-small.png"
import folderIcon from "@/assets/icons-file/folder.png"
import photoIcon from "@/assets/icons-file/photo.png"
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

export function iconFile(file: ItemProps) {
    const isGridView = useToolsStore((s) => s.isGridView);
    if (file.type === "folder") return isGridView ? folderIcon : folderSmallIcon;

    const isImage = file.fileType?.startsWith("image/");
    const thumb = useThumbnail(isImage ? file.hash : undefined);
    if (isGridView && thumb) return thumb;
    if(isImage) return photoIcon;

    const isVideo = file.fileType?.startsWith("video/");
    if(isVideo) return videoIcon;

    const isAudio = file.fileType?.startsWith("audio/");
    if(isAudio) return musicIcon;

    const ext = file.name.split(".").pop()?.toLowerCase();

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
};