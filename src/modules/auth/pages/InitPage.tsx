import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"

import '../styles/initPage.css'
import '../styles/global.css'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [deviceName, setDeviceName] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const setSession = useAuthStore(s => s.setSession)

    const handleSubmit = async () => {
        try {
            if (!deviceName) {
                alert("Please enter a device name")
                return
            }   
            const res = await register(deviceName)
            // console.log(res)

            localStorage.setItem("accessToken", res.accessToken)
            localStorage.setItem("device_uuid", res.device.uuid)

            setSession(res)
            navigate("/")
        } catch (error) {
            console.error('Error registering device:', error)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>สร้างบัญชีผู้ใช้ใหม่</h2>
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <input type="text" placeholder="ชื่อผู้ใช้" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
                    <input type={showPassword ? "text" : "password"} placeholder="รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="showPassword">
                        <input type="checkbox" id="showPassword" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
                        แสดงรหัสผ่านเป็นข้อความ
                    </label>
                    <button type="submit">สร้างบัญชี</button>
                    <a href="/login" className="link">
                        มีบัญชีอยู่แล้ว? ลงชื่อเข้าใช้
                    </a>
                </form>

            </div>
        </div>
    )
}