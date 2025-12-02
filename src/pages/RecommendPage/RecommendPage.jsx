import css from "./RecommendPage.module.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";

export default function RecommendPage() {
  return (
    <section className={css.section}>
      <Dashboard />
      <WordsTable />
    </section>
  );
}
