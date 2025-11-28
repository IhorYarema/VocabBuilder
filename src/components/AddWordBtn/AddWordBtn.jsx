import css from "./AddWordBtn.module.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddWordModal from "../AddWordModal/AddWordModal";

export default function AddWordBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        Add word
      </Button>

      <AddWordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
