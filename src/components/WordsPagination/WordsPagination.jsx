import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import css from "./WordsPagination.module.css";
import Icon from "../Icon/Icon";

// Компоненты для стрелок
function PreviousArrow(props) {
  return (
    <PaginationItem
      {...props}
      slots={{
        root: () => (
          <Icon className={css.iconArrow} name="categories" size={16} />
        ),
      }}
    />
  );
}

function NextArrow(props) {
  return (
    <PaginationItem
      {...props}
      slots={{
        root: () => (
          <Icon className={css.iconArrow} name="categories" size={16} />
        ),
      }}
    />
  );
}

export default function WordsPagination({ page, totalPages, onChange }) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onChange(value)}
        color="primary"
        showFirstButton
        showLastButton
        renderItem={(item) => {
          // Если цифра — рендерим стандартно
          if (item.type === "page") return <PaginationItem {...item} />;

          // Стрелки
          if (item.type === "previous")
            return (
              <PaginationItem
                {...item}
                slots={{
                  root: () => (
                    <Icon
                      className={css.iconArrow}
                      name="categories"
                      size={16}
                    />
                  ),
                }}
              />
            );
          if (item.type === "next")
            return (
              <PaginationItem
                {...item}
                slots={{
                  root: () => (
                    <Icon
                      className={css.iconArrow}
                      name="categories"
                      size={16}
                    />
                  ),
                }}
              />
            );
          if (item.type === "first")
            return (
              <PaginationItem
                {...item}
                slots={{
                  root: () => (
                    <Icon
                      className={css.iconArrow}
                      name="categories"
                      size={16}
                    />
                  ),
                }}
              />
            );
          if (item.type === "last")
            return (
              <PaginationItem
                {...item}
                slots={{
                  root: () => (
                    <Icon
                      className={css.iconArrow}
                      name="categories"
                      size={16}
                    />
                  ),
                }}
              />
            );
        }}
      />
    </Stack>
  );
}
