import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function ProgressBar({ value }) {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
    </>
  );
}
