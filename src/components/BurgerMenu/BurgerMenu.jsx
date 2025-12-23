import css from "./BurgerMenu.module.css";
import Icon from "../Icon/Icon";

export default function BurgerMenu({ open, setOpen, className = "" }) {
  return (
    <button
      className={`${open ? css.closeBtn : css.burgerBtn} ${className}`}
      onClick={() => setOpen(!open)}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <Icon className={css.iconNav} name="nav" />
    </button>
  );
}
