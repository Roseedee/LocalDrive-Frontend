import { useEffect, useRef, useState } from "react";
import { Overlay } from "./Overlay";

import '../styles/shareFilePopup.css'

import { getUserSuggestion } from "../api/file.api";

import closeIcon from '@/assets/icons/close-black.png';
import lockIcon from '@/assets/icons/lock.png';
import linkIcon from '@/assets/icons/link.png';
import imgTest from '@/assets/test/test1.jpg';

type ShareFilePopupProps = {
    open: boolean;
    onClose: () => void;
}

export default function ShareFilePopup({ open, onClose }: ShareFilePopupProps) {

    const inputRef = useRef<HTMLInputElement>(null)
    const [userSearch, setUserSearch] = useState("");
    // const [error, setError] = useState<string | null>(null);
    // const [loading, setLoading] = useState(false);
    const [userSuggestionList, setUserSuggestionList] = useState<any[]>([])

    useEffect(() => {
        const timeout = setTimeout(() => {
            searchUserSuggestion();
        }, 500);

        return () => clearTimeout(timeout);
    }, [userSearch])

    const searchUserSuggestion = async () => {
        if (!userSearch) return;
        try {
            const res = await getUserSuggestion(userSearch);
            if (res.status === 'ok') {
                setUserSuggestionList(res.users)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Overlay open={open} onClose={onClose}>
            <div className="overlay-card share-file-card">
                <div className="overlay-card-header">
                    <h3>แชร์ไฟล์</h3>
                    <button onClick={onClose} className="popup-close-btn">
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>
                <div className="input-container-popup row">
                    <div className="column input-user-search">
                        <input
                            ref={inputRef}
                            type="text"
                            id="username"
                            placeholder="เพิ่มผู้คน ชื่อผู้ใช้ อีเมล หรือรหัสเครื่อง"
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                            autoComplete="off"
                        />
                        {
                            userSearch && (
                                <div className="suggestion-list">
                                    {
                                        userSuggestionList.map((user, index) => (
                                            <div className={`suggestion-item ${index === 0 && 'active'}`} key={index}>
                                                <div className="suggestion-avatar">
                                                    <img src={imgTest} alt="User Avatar" />
                                                </div>
                                                <div className="suggestion-info">
                                                    <div className="suggestion-fullname">{user.name}</div>
                                                    <span className="tag">{user.username}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    <select>
                        <option value="read">อ่านอย่างเดียว</option>
                        <option value="edit">แก้ไขได้</option>
                    </select>
                </div>
                {/* {error && <p className="error-message">{error}</p>} */}
                <div className="suggestion-selected-list">
                    <span className="suggestion-selected-item">Roseedee Cehlaeh <img src={closeIcon} alt="" /></span>
                    <span className="suggestion-selected-item">Muhammad <img src={closeIcon} alt="" /></span>
                    <span className="suggestion-selected-item">Cehlaeh <img src={closeIcon} alt="" /></span>
                    <span className="suggestion-selected-item">Kasturee Cehlaeh <img src={closeIcon} alt="" /></span>
                </div>
                <h5>บุคคลที่มีสิทธิ์การเข้าถึง</h5>
                <div className="allowed-user-list">
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Solahudeen Chelaeh{"(Lah)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <span>เจ้าของ</span>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Roseedee Chelaeh{"(Dee)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                    <div className="allowed-user-item">
                        <div className="user-avatar">
                            <img src={imgTest} alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-fullname">Muhamasdfasdfawsd
                                ;flkaw';elrfjk'w;lekjfmad Chelaeh{"(Mad)"}</div>
                            <span className="tag">4wer5tg1w6er...</span>
                        </div>
                        <div className="permission-tag">
                            <select>
                                <option value="">ผู้มีสิทธิ์อ่าน</option>
                                <option value="">เอดิเตอร์</option>
                                <option value="">ยกเลิกสิทธิ์</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h5>การเข้าถึงทั่วไป</h5>
                <div className="general-access">
                    <div className="permission-icon">
                        <img src={lockIcon} alt="Lock" />
                    </div>
                    <div className="permission-description">
                        <select className="permission-select">
                            <option value="">จำกัด</option>
                            <option value="">ทุกคนที่มีลิงก์</option>
                        </select>
                        <span className='permission-text'>เฉพาะคนที่มีสิทธิ์เข้าถึงเท่านั้นที่เปิดด้วยลิงก์นี้ได้</span>
                    </div>
                </div>
                <div className="btn-container-popup">
                    <button className="btn-copy-link">
                        <img src={linkIcon} alt="Copy Link" />
                        คัดลอกลิงก์
                    </button>
                    <button
                        className="confirm"
                    >
                        {"ตกลง"}
                    </button>
                </div>
            </div>
        </Overlay>
    )
}