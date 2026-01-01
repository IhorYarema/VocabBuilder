import { useEffect } from "react";
import EditWordForm from "./EditWordForm/EditWordForm";
import css from "./EditWordModal.module.css";

export default function EditWordModal({ open, onClose, word }) {
  // Escape
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const closeByBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open || !word) return null;

  return (
    <div className={css.backdrop} onClick={closeByBackdrop}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <EditWordForm
          word={word}
          onSuccess={onClose}
          onCancel={onClose}
          className={css.form}
        />
      </div>
    </div>
  );
}
