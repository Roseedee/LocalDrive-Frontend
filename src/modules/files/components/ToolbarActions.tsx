import '../styles/toolbarActions.css'

import { useToolsStore } from '../store/tools.store';

import viewIcon from '@/assets/icons-menu/dashboard.png';
import selectIcon from '@/assets/icons-menu/check.png';
import noticeIcon from '@/assets/icons-menu/notice.png';
import viewFillIcon from '@/assets/icons-menu/dashboard-fill.png';
import selectFillIcon from '@/assets/icons-menu/check-fill.png';
import noticeFillIcon from '@/assets/icons-menu/notice-fill.png';

export default function ToolbarActions() {
    const isGridView = useToolsStore((s) => s.isGridView)
    const setIsGridView = useToolsStore((s) => s.setIsGridView)
    const isMultiSelectMode = useToolsStore((s) => s.isMultiSelectMode)
    const setIsMultiSelectMode = useToolsStore((s) => s.setIsMultiSelectMode)
    const showFileInfo = useToolsStore((s) => s.showFileInfo)
    const setShowFileInfo = useToolsStore((s) => s.setShowFileInfo)

    return (
        <div className="toolbar-action-content">
            <button className="toolbar action-btn" onClick={() => setIsGridView(!isGridView)}>
                <img src={isGridView ? viewFillIcon : viewIcon} alt="View" />
            </button>
            <button className="toolbar action-btn" onClick={() => setIsMultiSelectMode(!isMultiSelectMode)}>
                <img src={isMultiSelectMode ? selectFillIcon : selectIcon} alt="Select" />
            </button>
            <button className="toolbar action-btn" onClick={() => setShowFileInfo(!showFileInfo)}>
                <img src={showFileInfo ? noticeFillIcon : noticeIcon} alt="Notice" />
            </button>
        </div>
    );
}