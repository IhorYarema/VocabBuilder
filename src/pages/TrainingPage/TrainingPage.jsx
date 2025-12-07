import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainingTasks } from "../../redux/training/operations";
import {
  selectTasks,
  selectLoading,
  selectError,
} from "../../redux/training/selectors";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";
import WellDoneModal from "../../components/WellDoneModal/WellDoneModal";
import EmptyTasksMessage from "../../components/EmptyTasksMessage/EmptyTasksMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import css from "./TrainingPage.module.css";

export default function TrainingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector((state) => state.training.tasks);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatch(fetchTrainingTasks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load training tasks");
      navigate("/dictionary");
    }
  }, [error, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!tasks || tasks.length === 0) {
    return <EmptyTasksMessage />;
  }

  const total = tasks.length;

  return (
    <section className={css.section}>
      <ProgressBar total={total} completed={answers.length} />

      <TrainingRoom
        tasks={tasks}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        answers={answers}
        setAnswers={setAnswers}
        openModal={setModalData}
      />

      {modalData && (
        <WellDoneModal
          stats={modalData}
          onClose={() => navigate("/dictionary")}
        />
      )}
    </section>
  );
}
