import css from "./Statistics.module.css";
import { useSelector } from "react-redux";

export default function Statistics() {
  const words = useSelector((state) => state.words.items);

  const toStudyCount = words.filter(
    (word) => (word.progress ?? 0) < 100
  ).length;

  return (
    <div className={css.container}>
      <p className={css.text}>
        To study:<span className={css.span}>{toStudyCount}</span>
      </p>
    </div>
  );
}
