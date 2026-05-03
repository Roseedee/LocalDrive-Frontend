import { useEffect, type ReactNode } from "react";
import "../styles/overlay.css";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Overlay({ open, onClose, children }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleKey);
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="overlay-backdrop" onClick={onClose} />
      <div className="overlay-content">
        {children}
      </div>
    </div>
  );
}