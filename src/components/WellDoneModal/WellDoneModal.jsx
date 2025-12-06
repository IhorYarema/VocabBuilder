import css from "./WellDoneModal.module.css";

export default function WellDoneModal({ stats, onClose }) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Well done!</h2>

        <p>Correct: {stats.correct}</p>
        <p>Incorrect: {stats.incorrect}</p>
        <p>Success: {stats.percent}%</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
