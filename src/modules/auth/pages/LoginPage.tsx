import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.api"

export default function LoginPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    try {
      setLoading(true);
      await login(username, password)
      navigate("/compare-device");
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        setError("ชื่อผู้ใช้และรหัสผ่านไม่ถูกต้อง");
      } else {
        setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="auth-panel auth-panel-compact"
      aria-labelledby="login-title"
    >
      <h1 id="login-title">เข้าสู่ระบบ</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <p className="auth-error">{error}</p>}

        <button
          type="submit"
          className="auth-primary-btn"
          disabled={loading}
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "ตกลง"}
        </button>

        <Link className="auth-secondary-btn" to="/register">
          สร้างบัญชีใหม่
        </Link>
      </form>
    </section>
  );
}