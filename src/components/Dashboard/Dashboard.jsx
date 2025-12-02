import css from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";

export default function Dashboard() {
  return (
    <div className={css.container}>
      <Filters />
      <Statistics />
    </div>
  );
}
