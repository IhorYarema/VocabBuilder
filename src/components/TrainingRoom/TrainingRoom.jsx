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

  const task = tasks[currentIndex];
  const isLast = currentIndex === tasks.length - 1;

  const handleNext = () => {
    if (input.trim()) {
      setAnswers((prev) => [...prev, { taskId: task._id, answer: input }]);
    }

    setInput("");

    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  const handleSave = () => {
    const final = [...answers];
    if (input.trim()) {
      final.push({ taskId: task._id, answer: input });
    }

    dispatch(sendTrainingResults(final))
      .unwrap()
      .then((res) => openModal(res))
      .catch(() => {
        toast.error("Progress not saved. Redirecting...");
        navigate("/dictionary");
      });
  };

  return (
    <div className={css.room}>
      <div className={css.left}>
        <input
          className={css.input}
          placeholder="Enter translation..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className={css.right}>
        <h2 className={css.word}>{task.en}</h2>
      </div>

      <div className={css.actions}>
        {!isLast && (
          <button className={css.next} onClick={handleNext}>
            Next
          </button>
        )}

        {isLast && (
          <button className={css.save} onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}
