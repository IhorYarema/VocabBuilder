import { Link } from "react-router-dom";
import css from "./TrainingPage.module.css";

export default function TrainingPage() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.code}>TrainingPage</h1>
        <Link to="/" className={css.homeBtn}>
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
