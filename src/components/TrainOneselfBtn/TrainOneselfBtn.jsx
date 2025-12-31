import css from "./TrainOneselfBtn.module.css";
import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";

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
        <Icon
          className={css.iconArrow}
          name="switch-horizontal-one"
          size={20}
        />
      </NavLink>
    </>
  );
}
