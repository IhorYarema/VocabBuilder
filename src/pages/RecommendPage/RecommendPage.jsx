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
import { toast } from "react-toastify";

export default function RecommendPage() {
  const dispatch = useDispatch();
  const { items, page, totalPages, limit } = useSelector((s) => s.recommend);

  useEffect(() => {
    dispatch(fetchRecommendedWords({ page, limit }));
  }, [dispatch, page, limit]);

  const handleAdd = async (id) => {
    try {
      await dispatch(addWordFromRecommend(id)).unwrap();
      toast.success("Word added to your dictionary!");
    } catch (err) {
      if (err === "Such a word exists") {
        toast.info("This word is already in your dictionary!");
      } else {
        toast.error(err?.message || "Failed to add word");
      }
    }
  };

  const handlePageChange = (p) => {
    dispatch(fetchRecommendedWords({ page: p, limit }));
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
        onChange={handlePageChange}
      />
    </section>
  );
}
