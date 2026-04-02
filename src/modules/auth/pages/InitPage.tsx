import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"

export default function RegisterPage() {
    const navigate = useNavigate()
    const [deviceName, setDeviceName] = useState("")
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
        <div>
            <a href="/">Back to Home</a>
            Register Page
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <input type="text" placeholder="Device Name" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}