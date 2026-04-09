import '../styles/actionContent.css'

import createFolderIcon from '@/assets/icons/menu/create-folder.png';
import createFileIcon from '@/assets/icons/menu/create-file.png';
import downloadIcon from '@/assets/icons/menu/downloads.png';
import deleteIcon from '@/assets/icons/menu/bin.png';
import favoriteIcon from '@/assets/icons/menu/favorite.png';
import shareIcon from '@/assets/icons/menu/send.png';
import editIcon from '@/assets/icons/menu/edit.png';


export default function ActionContent() {

    return (
        <div className="action-content">
            <div className="primary-actions">
                <button className="action-btn">
                    <img src={createFolderIcon} alt="Create Folder" />
                </button>
                <button className="action-btn">
                    <img src={createFileIcon} alt="Create File" />
                </button>
            </div>
            <div className="selection-actions">
                <button className="action-btn loading">
                    <img src={downloadIcon} alt="Download" />
                </button>
                <button className="action-btn">
                    <img src={deleteIcon} alt="Delete" />
                </button>
                <button className="action-btn">
                    <img src={favoriteIcon} alt="Favorite" />
                </button>
                <button className="action-btn">
                    <img src={shareIcon} alt="Share" />
                </button>
                <button className="action-btn">
                    <img src={editIcon} alt="Edit" />
                </button>
            </div>
        </div>
    )
}