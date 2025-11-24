import css from "./AddWordBtn.module.css";
import { useSelector, useDispatch } from "react-redux";

export default function AddWordBtn() {
  const dispatch = useDispatch();

  return <div className={css.container}></div>;
}
