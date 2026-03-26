import computerIcon from '@/assets/icons/computer.png';

export default function Device() {

    return (
        <li className="section-item">
            <a href="/device/my-computer">
                <img src={computerIcon} alt="Computer" />
                <div className="row between center">
                    <div className="column gap-3">
                        <p>Laptop MSI</p>
                        <span className='tag'>f4s5s8w6...</span>
                    </div>
                    <span className='tag'>ออนไลน์</span>
                </div>
            </a>
        </li>
    )
}