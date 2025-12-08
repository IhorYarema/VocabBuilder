import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import UserNav from "../UserNav/UserNav";
import UserBar from "../UserBar/UserBar";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutUserThunk } from "../../redux/auth/operations.js";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();
      toast.success("Logout successfull!");
      dispatch(resetFilters());
    } catch (error) {
      toast.error("Logout error " + error);
    } finally {
      setMenuOpen(false);
      navigate("/login");
    }
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        <div className={css.containerUserAndBurger}>
          <UserBar className={css.userBar} />
          <BurgerMenu
            open={menuOpen}
            setOpen={setMenuOpen}
            className={css.burgerMenu}
          />
        </div>
        {/* <UserNav className={css.userNav} /> */}

        {/* <LogOutBtn className={css.logOutBtn} onLogout={handleLogout} /> */}
      </div>
    </header>
  );
}
