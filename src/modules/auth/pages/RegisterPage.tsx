import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../../shared/lib/axios"

export default function RegisterPage() {
    const navigate = useNavigate()
    const [deviceName, setDeviceName] = useState("")

    const handleSubmit = async () => {
        try {
            await api.post("/auth/init", {}, {
                headers: {
                    "X-Device-Name": deviceName
                }
            })
            alert("Device registered successfully!")
            navigate("/", { replace: true })
        } catch (err) {
            console.error(err)
            alert("Failed to register device.")
        }
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