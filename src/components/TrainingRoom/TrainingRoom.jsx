import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendTrainingResults } from "../../redux/training/operations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import css from "./TrainingRoom.module.css";

export default function TrainingRoom({
  tasks,
  currentIndex,
  setCurrentIndex,
  answers,
  setAnswers,
  openModal,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  if (!tasks.length || currentIndex >= tasks.length) return null;

  const task = tasks[currentIndex];
  const isLast = currentIndex === tasks.length - 1;

  const wordToShow = task.task === "en" ? task.ua : task.en;

  const handleNext = () => {
    if (input.trim()) {
      setAnswers((prev) => [...prev, { taskId: task._id, answer: input }]);
    }
    setInput("");
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  const handleSave = async () => {
    const finalAnswers = [...answers];
    if (input.trim()) {
      finalAnswers.push({ taskId: task._id, answer: input });
    }

    try {
      const result = await dispatch(sendTrainingResults(finalAnswers)).unwrap();
      openModal(result);
    } catch {
      toast.error("Progress not saved. Redirecting...");
      navigate("/dictionary");
    }
  };

  return (
    <div className={css.room}>
      <div className={css.left}>
        <p className={css.label}>Enter translation</p>
        <input
          className={css.input}
          placeholder="Enter translation..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {!isLast && (
          <button className={css.next} onClick={handleNext}>
            Next
          </button>
        )}
      </div>

      <div className={css.right}>
        <h2 className={css.word}>{wordToShow}</h2>
        <div className={css.flagBlock}>
          {task.task === "en" ? (
            <>
              🇺🇦 <span>Ukrainian</span>
            </>
          ) : (
            <>
              🇬🇧 <span>English</span>
            </>
          )}
        </div>
      </div>

      {isLast && (
        <div className={css.actions}>
          <button className={css.save} onClick={handleSave}>
            Save
          </button>
          <button
            className={css.cancel}
            onClick={() => navigate("/dictionary")}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
