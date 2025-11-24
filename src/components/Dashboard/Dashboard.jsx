import css from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";
import AddWordBtn from "../AddWordBtn/AddWordBtn";

export default function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <Filters />
      <Statistics />
      <AddWordBtn />
    </div>
  );
}
