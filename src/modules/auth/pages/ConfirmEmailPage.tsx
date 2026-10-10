import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const OTP_LENGTH = 6;

export default function ConfirmEmailPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isComplete = otp.every((digit) => digit);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (digits.length === 0) return;

    setOtp((current) => {
      const next = [...current];
      digits.forEach((digit, index) => {
        next[index] = digit;
      });
      return next;
    });

    focusInput(Math.min(digits.length, OTP_LENGTH - 1));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isComplete) return;

    navigate("/compare-device");
  };

  return (
    <section className="auth-panel auth-panel-confirm" aria-labelledby="confirm-email-title">
      <div className="auth-heading">
        <h1 id="confirm-email-title">ยืนยันอีเมล</h1>
        <p>กรอกรหัส OTP 6 หลักที่ส่งไปยังอีเมลของคุณ</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="otp-input-list" aria-label="รหัส OTP 6 หลัก">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(node) => {
                inputRefs.current[index] = node;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              aria-label={`OTP หลักที่ ${index + 1}`}
            />
          ))}
        </div>

        {isComplete && (
          <button type="submit" className="auth-primary-btn">
            ตกลง
          </button>
        )}
      </form>
    </section>
  );
}
