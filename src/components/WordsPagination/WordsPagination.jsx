import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function WordsPagination({ page, totalPages, onChange }) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onChange(value)}
        color="primary"
      />
    </Stack>
  );
}
