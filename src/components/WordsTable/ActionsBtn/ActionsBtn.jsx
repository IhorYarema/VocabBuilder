import { useState } from "react";
import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ActionsBtn({ onEdit, onDelete }) {
  const [anchor, setAnchor] = useState(null);

  const open = Boolean(anchor);

  return (
    <>
      <button onClick={(e) => setAnchor(e.currentTarget)}>
        <MoreVertIcon />
      </button>

      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <div style={{ padding: 10 }}>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </Popover>
    </>
  );
}
