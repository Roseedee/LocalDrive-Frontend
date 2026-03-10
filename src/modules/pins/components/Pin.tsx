import folderIcon from '@/assets/icons/folder.png';

export default function Pin() {

    return (
        <li className="section-item">
            <a href="/file/123">
                <img src={folderIcon} alt="Computer" />
                <div className="column gap-3">
                    <b>งานกล้องวงจรปิด</b>
                    {/* <span className='tag'>f4s5s8w6...</span> */}
                </div>
            </a>
        </li>
    )
}