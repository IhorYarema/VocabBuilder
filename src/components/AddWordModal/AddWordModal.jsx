import { useEffect } from "react";
import AddWordForm from "./AddWordForm/AddWordForm";
import css from "./AddWordModal.module.css";

export default function AddWordModal({ open, onClose }) {
  // Escape
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const closeByBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return (
    <div className={css.backdrop} onClick={closeByBackdrop}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <AddWordForm onSuccess={onClose} onCancel={onClose} />
      </div>
    </div>
  );
}
