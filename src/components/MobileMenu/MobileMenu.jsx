import css from "./MobileMenu.module.css";
import UserNav from "../UserNav/UserNav";
import UserBar from "../UserBar/UserBar";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import Icon from "../Icon/Icon";
import illustration from "../../assets/illustrationpng.png";

export default function MobileMenu({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className={css.backdrop} onClick={() => setOpen(false)}>
      <aside className={css.menu} onClick={(e) => e.stopPropagation()}>
        <div className={css.upperContainer}>
          <UserBar />
          <button className={css.closeBtn}>
            <Icon className={css.iconClose} name="x-close" size={32} />
          </button>
        </div>
        <UserNav closeMenu={() => setOpen(false)} />
        <LogOutBtn />
        <img
          src={illustration}
          alt="young couple sitting on the floor and reading"
          loading="lazy"
          className={css.img}
        />
      </aside>
    </div>
  );
}
