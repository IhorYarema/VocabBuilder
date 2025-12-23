import css from "./MobileMenu.module.css";
import UserNav from "../UserNav/UserNav";

export default function MobileMenu({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className={css.backdrop} onClick={() => setOpen(false)}>
      <aside className={css.menu} onClick={(e) => e.stopPropagation()}>
        <UserNav closeMenu={() => setOpen(false)} />
      </aside>
    </div>
  );
}
