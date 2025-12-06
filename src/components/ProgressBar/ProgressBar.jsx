import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function ProgressBar({ value }) {
  const safeValue = typeof value === "number" ? value : 0;
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={safeValue} />
    </Box>
  );
}
