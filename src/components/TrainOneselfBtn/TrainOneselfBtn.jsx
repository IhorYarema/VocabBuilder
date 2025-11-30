import css from "./TrainOneselfBtn.module.css";
import { NavLink } from "react-router-dom";

export default function AddWordBtn() {
  return (
    <>
      <NavLink
        to="/training"
        end
        className={({ isActive }) =>
          `${css.link} ${css.dictionary} ${isActive ? css.active : ""}`
        }
      >
        Train oneself
      </NavLink>
    </>
  );
}
