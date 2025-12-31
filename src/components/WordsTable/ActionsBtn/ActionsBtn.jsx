import { useState } from "react";
import Popover from "@mui/material/Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { toast } from "react-toastify";

export default function ActionsBtn({ onEdit, onDelete }) {
  const [anchor, setAnchor] = useState(null);

  const open = Boolean(anchor);

  const handleEdit = () => {
    setAnchor(null);
    onEdit();
  };

  const handleDelete = async () => {
    await setAnchor(null);
    try {
      onDelete();
      toast.success("Word deleted!");
    } catch (err) {
      toast.error(err?.message || "Delete failed");
    }
  };

  return (
    <>
      <button onClick={(e) => setAnchor(e.currentTarget)}>
        <MoreHorizIcon />
      </button>

      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <div
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </Popover>
    </>
  );
}
