import { Link, useNavigate } from "react-router-dom";
import css from "./EmptyTasksMessage.module.css";

export default function EmptyTasksMessage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dictionary", { state: { openAddWord: true } });
  };

  return (
    <div className={css.empty}>
      <p>You don’t have any tasks yet.</p>
      <button onClick={handleClick}>Add word</button>
    </div>
  );
}
