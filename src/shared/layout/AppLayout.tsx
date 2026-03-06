import { Outlet } from 'react-router-dom';
import './styles/app.layout.css';


import appIcon from '@/assets/icons/app.png';

export default function AppLayout() {
  return (
    <div className="app-layout">
      <div className="left-sidebar">
        <div className="left-sidebar-header">
          <a href="/">
            <img src={appIcon} alt="Icon" className='app-icon'/>
            <h2 className='app-name'>LOCAL DRIVE</h2>
          </a>
        </div>
        <div className="left-sidebar-list">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/files">Files</a></li>
                <li><a href="/settings">Settings</a></li>
            </ul>
        </div>
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