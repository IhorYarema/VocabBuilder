import css from "./LogOutBtn.module.css";
import Icon from "../Icon/Icon";

export default function LogOutBtn({ onLogout, className }) {
  return (
    <>
      <button className={`${css.btn} ${className}`} onClick={() => onLogout()}>
        Log out
        <Icon
          className={css.iconArrow}
          name="switch-horizontal-one"
          size={16}
        />
      </button>
    </>
  );
}
