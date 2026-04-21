import "../styles/fileListView.css"

import type { ItemProps } from "../models/file.model"
import FileListItem from "./FileListItem"

type Props = {
    items: ItemProps[] | null,
    onOpen?: (item: ItemProps) => void
}

export default function FileListView({ items, onOpen }: Props) {

    return (
        <div className="file-list">
            <div className="file-list-header">
                <div className="file-list-col name">ชื่อ</div>
                <div className="file-list-col">เจ้าของ</div>
                <div className="file-list-col">วันที่แก้ไข</div>
                <div className="file-list-col">ขนาดไฟล์</div>
                <div className="file-list-col action"></div>
            </div>

            {items?.map((file) => (
                <FileListItem item={file} onOpen={onOpen}/>
            ))}
        </div>
    )
}