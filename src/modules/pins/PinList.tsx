import { useState } from 'react';

import Pin from './components/Pin';

import arrowIcon from '@/assets/icons/arrow.png';

export default function PinList() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <ul className={`left-sidebar-section`}>
        <div className="section-title">
            <span>รายการที่ปักหมุด</span>
            <img src={arrowIcon} alt="" onClick={() => setIsOpen(!isOpen)} className={isOpen ? 'rotated' : ''}/>
        </div>
        {
          isOpen && (
            <>
              <Pin />
              <Pin />
            </>
          )
        }
    </ul>
  );
}