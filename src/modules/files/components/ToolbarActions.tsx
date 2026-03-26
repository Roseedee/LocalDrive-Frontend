import { useState } from 'react';

import '../styles/toolbarActions.css'

import viewIcon from '@/assets/icons/menu/dashboard.png';
import selectIcon from '@/assets/icons/menu/check.png';
import noticeIcon from '@/assets/icons/menu/notice.png';
import viewFillIcon from '@/assets/icons/menu/dashboard-fill.png';
import selectFillIcon from '@/assets/icons/menu/check-fill.png';
import noticeFillIcon from '@/assets/icons/menu/notice-fill.png';

export default function ToolbarActions() {
    const [viewActive, setViewActive] = useState(false);
    const [selectActive, setSelectActive] = useState(false);
    const [noticeActive, setNoticeActive] = useState(false);
    
    return (
        <div className="toolbar-action-content">
            <button className="toolbar-action-btn" onClick={() => setViewActive(!viewActive)}>
                <img src={viewActive ? viewFillIcon : viewIcon} alt="View" />
            </button>
            <button className="toolbar-action-btn" onClick={() => setSelectActive(!selectActive)}>
                <img src={selectActive ? selectFillIcon : selectIcon} alt="Select" />
            </button>
            <button className="toolbar-action-btn" onClick={() => setNoticeActive(!noticeActive)}>
                <img src={noticeActive ? noticeFillIcon : noticeIcon} alt="Notice" />
            </button>
        </div>
    );
}