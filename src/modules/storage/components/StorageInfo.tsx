import "../styles/storageInfo.css";

export default function StorageInfo() {
    return (
        <div className="storage-info">
            <div className="storage-info-header">
                <h4 className="storage-info-label">พื้นที่ข้อมูล</h4>
                <h4 className="storage-info-value">15 GB</h4>
            </div>
            <div className="storage-info-content">
                <div className="storage-info-item row between">
                    <small className="storage-info-label">7.25GB/15GB</small>
                    <small className="storage-info-value">52%</small>
                </div>
                <div className="storage-info-item">
                    <div className="storage-info-bar">
                        <div className="storage-info-used" style={{ width: '50%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}