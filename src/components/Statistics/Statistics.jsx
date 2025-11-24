import css from "./Statistics.module.css";
import { useSelector, useDispatch } from "react-redux";

export default function Statistics() {
  const dispatch = useDispatch();

  return <div className={css.container}></div>;
}
