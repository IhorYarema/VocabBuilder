import css from "./AddWordBtn.module.css";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddWordModal from "../AddWordModal/AddWordModal";
import React, { useState } from "react";

export default function AddWordBtn() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {" "}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add word
      </Button>
      <AddWordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
