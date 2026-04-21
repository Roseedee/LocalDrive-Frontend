import "../styles/fileGridView.css"

import type { ItemProps } from "../models/file.model";

import FileGridItem from "./FileGridItem";

type Props = {
    items: ItemProps[] | null
    onOpen?: (item: ItemProps) => void
}

export default function FileGridView({ items, onOpen }: Props) {

    return (
        <div className="file-container">
            {items?.map((file, index) => (
                <FileGridItem key={index} item={file} onOpen={onOpen} />
            ))}
        </div>
    )
}