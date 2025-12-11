import css from "./UserNav.module.css";
import { NavLink, useLocation } from "react-router-dom";

export default function UserNav({
  isLoggedIn = false,
  closeMenu = () => {},
  userName = "",
  isMobile = false,
  className = "",
}) {
  const location = useLocation();

  return (
    <nav className={`${css.navGroup} ${className}`}>
      <NavLink
        to="/dictionary"
        end
        className={({ isActive }) =>
          `${css.link} ${css.dictionary} ${isActive ? css.active : ""}`
        }
        onClick={closeMenu}
      >
        Dictionary
      </NavLink>
      <NavLink
        to="/recommend"
        end
        className={({ isActive }) =>
          `${css.link} ${css.dictionary} ${isActive ? css.active : ""}`
        }
        onClick={closeMenu}
      >
        Recommend
      </NavLink>
      <NavLink
        to="/training"
        end
        className={({ isActive }) =>
          `${css.link} ${css.dictionary} ${isActive ? css.active : ""}`
        }
        onClick={closeMenu}
      >
        Training
      </NavLink>
    </nav>
  );
}
