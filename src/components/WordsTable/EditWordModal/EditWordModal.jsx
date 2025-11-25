import { useState } from "react";
// import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { updateWord } from "../../../redux/words/operations";

export default function EditWordModal({ open, onClose, word }) {
  const [value, setValue] = useState(word?.translation || "");
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateWord({ id: word._id, payload: { translation: value } }));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          padding: 20,
          background: "#fff",
          margin: "15% auto",
          width: 300,
        }}
      >
        <h3>Edit word</h3>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </Modal>
  );
}
