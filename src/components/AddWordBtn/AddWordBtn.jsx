import css from "./AddWordBtn.module.css";
import { useState } from "react";
import AddWordModal from "../AddWordModal/AddWordModal";
import Icon from "../Icon/Icon";

export default function AddWordBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={css.btn}>
        Add word
        <Icon className={css.iconAdd} name="plus" size={20} />
      </button>

      <AddWordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
