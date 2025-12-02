import css from "./RecommendPage.module.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import { useEffect } from "react";
import {
  fetchRecommendedWords,
  addWordFromRecommend,
} from "../../redux/recommend/operations";
import { useSelector, useDispatch } from "react-redux";

export default function RecommendPage() {
  const dispatch = useDispatch();
  const { items, page, totalPages, limit } = useSelector((s) => s.recommend);

  useEffect(() => {
    dispatch(fetchRecommendedWords({ page, limit }));
  }, [page, limit]);

  const handleAdd = (id) => {
    dispatch(addWordFromRecommend(id));
  };

  return (
    <section className={css.section}>
      <Dashboard />
      <WordsTable
        items={items}
        mode="recommend"
        onAddToDictionary={handleAdd}
      />
      <WordsPagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => dispatch(fetchRecommendedWords({ page: p, limit }))}
      />
    </section>
  );
}
