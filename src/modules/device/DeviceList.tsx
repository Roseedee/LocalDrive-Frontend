import { useState } from 'react';
import Device from './components/Device';

import arrowIcon from '@/assets/icons/arrow.png';

export default function DeviceList() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <ul className={`left-sidebar-section`}>
        <div className="section-title">
            <span>อุปกรณ์ของคุณ</span>
            <img src={arrowIcon} alt="" onClick={() => setIsOpen(!isOpen)} className={isOpen ? 'rotated' : ''}/>
        </div>
        {
          isOpen && (
            <>
              <Device />
              <Device />
            </>
          )
        }
    </ul>
  );
}