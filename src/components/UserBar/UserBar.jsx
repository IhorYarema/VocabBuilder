import css from "./UserBar.module.css";
import { selectUserName } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import Icon from "../Icon/Icon";

export default function UserBar({ className }) {
  // const [showModal, setShowModal] = useState(false);
  const userName = useSelector(selectUserName);

  return (
    <div className={`${css.wrapper} ${className}`}>
      <span className={css.name}>{userName}</span>
      <div className={css.avatar}>
        <Icon className={css.iconUser} name="gridicons_user" size={20} />
      </div>
    </div>
  );
}
