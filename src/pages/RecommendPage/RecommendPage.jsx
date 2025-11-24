import { Link } from "react-router-dom";
import css from "./RecommendPage.module.css";

export default function RecommendPage() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.code}>RecommendPage</h1>
        <Link to="/" className={css.homeBtn}>
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
