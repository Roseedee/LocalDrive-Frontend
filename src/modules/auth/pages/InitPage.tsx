import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../api/auth.api"

export default function RegisterPage() {
    const navigate = useNavigate()
    const [deviceName, setDeviceName] = useState("")

    const handleSubmit = async () => {
        register(deviceName).then(() => {
            navigate('/files')
        }).catch(() => {
            // console.log(err)
        })
    }

    return (
        <div>
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