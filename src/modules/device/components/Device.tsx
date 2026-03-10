import computerIcon from '@/assets/icons/computer.png';

export default function Device() {

    return (
        <li className="section-item">
            <a href="/device/my-computer">
                <img src={computerIcon} alt="Computer" />
                <div className="column gap-3">
                    <b>Laptop MSI</b>
                    <span className='tag'>f4s5s8w6...</span>
                </div>
            </a>
        </li>
    )
}