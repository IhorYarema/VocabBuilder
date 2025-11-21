import css from "./LogOutBtn.module.css";

export default function LogOutBtn({ onLogout }) {
  return (
    <>
      <button className={css.btn} onClick={() => onLogout()}>
        Log out
      </button>
    </>
  );
}
