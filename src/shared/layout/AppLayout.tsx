import './app.layout.css';

import { Outlet } from 'react-router-dom';
import DeviceList from '@/modules/device/DeviceList';
import PinList from '@/modules/pins/PinList';
import StorageInfo from '@/modules/storage/components/StorageInfo';

import appIcon from '@/assets/icons/app.png';
import arrowIcon from '@/assets/icons/arrow.png';
import uploadIcon from '@/assets/icons/upload.png';
import settingsIcon from '@/assets/icons/setting.png';
import computerIcon from '@/assets/icons/computer.png';
import shareIcon from '@/assets/icons/share.png';
import favoriteIcon from '@/assets/icons/favorite.png';
import share1Icon from '@/assets/icons/share_1.png';
import trashIcon from '@/assets/icons/bin.png';

export default function AppLayout() {

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.left-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  };

  return (
    <div className="app-layout">
      <div className="left-sidebar">
        <div className="left-sidebar-header">
          <a href="/">
            <img src={appIcon} alt="Icon" className='app-icon' />
            <h2 className='app-name in-line-text'>LOCAL DRIVE</h2>
          </a>
          <div className="btn-collapse" title='collapsed' onClick={toggleSidebar}>
            <img src={arrowIcon} alt="Arrow" />
          </div>
        </div>
        <button className="upload-file-btn">
          <img src={uploadIcon} alt="Upload" />
          <b>อัพโหลดไฟล์</b>
        </button>
        <div className="left-sidebar-list">
          <DeviceList />
          <PinList />
          <ul className={`left-sidebar-section`}>
            <div className="section-title">
              <span>เครื่องนี้</span>
            </div>
            <li className="section-item">
              <a href="/file">
                <img src={computerIcon} alt="Computer" />
                <div className="row between">
                  <b>ไฟล์เครื่องนี้</b>
                  {/* <span className='tag'></span> */}
                </div>
              </a>
            </li>
            <li className="section-item">
              <a href="/file">
                <img src={shareIcon} alt="Computer" />
                <div className="row between">
                  <b>ที่แชร์กับเครื่องนี้</b>
                  {/* <span className='tag'></span> */}
                </div>
              </a>
            </li>
            <li className="section-item">
              <a href="/file">
                <img src={favoriteIcon} alt="Computer" />
                <div className="row between">
                  <b>รายการโปรด</b>
                  <span className='tag'>15</span>
                </div>
              </a>
            </li>
            <li className="section-item">
              <a href="/file">
                <img src={share1Icon} alt="Computer" />
                <div className="row between">
                  <b>รายการไฟล์ที่แชร์</b>
                  <span className='tag'>13</span>
                </div>
              </a>
            </li>
            <li className="section-item">
              <a href="/file">
                <img src={trashIcon} alt="Computer" />
                <div className="row between">
                  <b>ถังขยะ</b>
                  <span className='tag'>55</span>
                </div>
              </a>
            </li>
            <StorageInfo />
          </ul>
        </div>
        <footer>
          <a className="settings-btn" href="/settings">
            <img src={settingsIcon} alt="Settings" />
            <b>การตั้งค่า</b>
          </a>
          <p className='in-line-text'>&copy; 2026 Local Drive. All rights reserved.</p>
        </footer>
      </div>

      <div className="main-content">
        <div className="header">
          asdf
        </div>
        <Outlet />
      </div>
    </div>
  );
}