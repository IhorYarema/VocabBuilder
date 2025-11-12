import css from "./Header.module.css";
import Logo from "../Logo/Logo";
// import Navigation from "./Navigation/Navigation";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
      </div>
    </header>
  );
}
