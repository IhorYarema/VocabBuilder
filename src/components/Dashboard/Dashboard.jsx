import css from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";
import AddWordBtn from "../AddWordBtn/AddWordBtn";
import TrainOneselfBtn from "../TrainOneselfBtn/TrainOneselfBtn";

export default function Dashboard() {
  return (
    <div className={css.container}>
      <Filters />
      <Statistics />
      <AddWordBtn />
      <TrainOneselfBtn />
    </div>
  );
}
