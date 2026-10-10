import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/compare-device");
  };

  return (
    <section className="auth-panel auth-panel-compact" aria-labelledby="login-title">
      <h1 id="login-title">เข้าสู่ระบบ</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="ชื่อผู้ใช้" />
        <input type="password" placeholder="รหัสผ่าน" />

        <button type="submit" className="auth-primary-btn">
          ตกลง
        </button>

        <Link className="auth-secondary-btn" to="/register">
          สร้างบัญชีใหม่
        </Link>
      </form>
    </section>
  );
}
