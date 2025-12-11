import css from "./BurgerMenu.module.css";
import Icon from "../Icon/Icon";

export default function BurgerMenu({ open, setOpen, className = "" }) {
  return (
    <button
      className={`${open ? css.closeBtn : css.burgerBtn} ${className}`}
      onClick={() => setOpen(!open)}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      {open ? (
        <svg className={css.closeIcon}>
          <use href="/icons.svg#icon-close" />
        </svg>
      ) : (
        <Icon className={css.iconNav} name="nav" />
      )}
    </button>
  );
}
