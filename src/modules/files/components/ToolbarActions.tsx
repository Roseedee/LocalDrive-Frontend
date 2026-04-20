import '../styles/toolbarActions.css'

import { useToolsStore } from '../store/tools.store';

import viewIcon from '@/assets/icons-menu/dashboard.png';
import selectIcon from '@/assets/icons-menu/check.png';
import noticeIcon from '@/assets/icons-menu/notice.png';
import viewFillIcon from '@/assets/icons-menu/dashboard-fill.png';
import selectFillIcon from '@/assets/icons-menu/check-fill.png';
import noticeFillIcon from '@/assets/icons-menu/notice-fill.png';

export default function ToolbarActions() {
    const { 
        isGridView, setIsGridView,
        hasMultipleFilesSelected, setHasMultipleFilesSelected,
        showFileInfo, setShowFileInfo,
     } = useToolsStore();

    return (
        <div className="toolbar-action-content">
            <button className="toolbar action-btn" onClick={() => setIsGridView(!isGridView)}>
                <img src={isGridView ? viewFillIcon : viewIcon} alt="View" />
            </button>
            <button className="toolbar action-btn" onClick={() => setHasMultipleFilesSelected(!hasMultipleFilesSelected)}>
                <img src={hasMultipleFilesSelected ? selectFillIcon : selectIcon} alt="Select" />
            </button>
            <button className="toolbar action-btn" onClick={() => setShowFileInfo(!showFileInfo)}>
                <img src={showFileInfo ? noticeFillIcon : noticeIcon} alt="Notice" />
            </button>
        </div>
    );
}