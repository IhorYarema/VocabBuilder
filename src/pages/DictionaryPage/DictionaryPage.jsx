import Dashboard from "../../components/Dashboard/Dashboard";
import css from "./DictionaryPage.module.css";
import WordsTable from "../../components/WordsTable/WordsTable";

export default function DictionaryPage() {
  return (
    <section className={css.section}>
      <Dashboard />
      <WordsTable />
    </section>
  );
}
