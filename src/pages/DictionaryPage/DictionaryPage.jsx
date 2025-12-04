import Dashboard from "../../components/Dashboard/Dashboard";
import css from "./DictionaryPage.module.css";
import WordsTable from "../../components/WordsTable/WordsTable";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import { fetchUserWords } from "../../redux/words/operations";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AddWordBtn from "../../components/AddWordBtn/AddWordBtn";
import TrainOneselfBtn from "../../components/TrainOneselfBtn/TrainOneselfBtn";

export default function DictionaryPage() {
  const dispatch = useDispatch();
  const { items, page, totalPages, limit } = useSelector((s) => s.words);

  useEffect(() => {
    dispatch(fetchUserWords({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage) =>
    dispatch(fetchUserWords({ page: newPage, limit }));

  return (
    <section className={css.section}>
      <Dashboard />
      <AddWordBtn />
      <TrainOneselfBtn />

      <WordsTable items={items} mode="dictionary" />

      <WordsPagination
        page={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </section>
  );
}
