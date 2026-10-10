import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/confirm-email");
  };

  return (
    <section className="auth-panel" aria-labelledby="register-title">
      <h1 id="register-title">สร้างบัญชีใหม่</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="ชื่อ-นามสกุล" />
        <input type="text" placeholder="ชื่อผู้ใช้" />
        <input type="email" placeholder="อีเมล" />
        <input type="password" placeholder="รหัสผ่าน" />

        <button type="submit" className="auth-primary-btn">
          สร้างบัญชีใหม่
        </button>

        <Link className="auth-secondary-btn" to="/login">
          เข้าสู่ระบบ
        </Link>
      </form>
    </section>
  );
}
