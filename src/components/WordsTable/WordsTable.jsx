import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { fetchUserWords, deleteWord } from "../../redux/words/operations";
import { selectWords, selectWordsLoading } from "../../redux/words/selectors";

import ProgressBar from "./ProgressBar/ProgressBar";
import ActionsBtn from "./ActionsBtn/ActionsBtn";
import EditWordModal from "./EditWordModal/EditWordModal";
import { addWordFromRecommend } from "../../redux/recommend/operations";

export default function WordsTable({ items, mode = "dictionary" }) {
  const dispatch = useDispatch();
  const words = useSelector(selectWords);
  const loading = useSelector(selectWordsLoading);

  const [editWord, setEditWord] = useState(null);

  useEffect(() => {
    dispatch(fetchUserWords());
  }, [dispatch]);

  const columns = useMemo(() => {
    const base = [
      {
        header: "Word",
        accessorKey: "en",
      },
      {
        header: "Translation",
        accessorKey: "ua",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Progress",
        accessorFn: (row) => row.progress,
        cell: ({ row }) => <ProgressBar value={row.original.progress} />,
      },
    ];

    // ░░ DICTIONARY MODE (own words) ░░
    if (mode === "dictionary") {
      base.push({
        header: "Actions",
        cell: ({ row }) => (
          <ActionsBtn
            onEdit={() => setEditWord(row.original)}
            onDelete={() => dispatch(deleteWord(row.original._id))}
          />
        ),
      });
    }

    // ░░ RECOMMEND MODE (foreign words) ░░
    if (mode === "recommend") {
      base.push({
        header: "Add",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => dispatch(addWordFromRecommend(row.original._id))}
            style={{
              padding: "6px 10px",
              background: "#4CAF50",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add to dictionary
          </button>
        ),
      });
    }

    return base;
  }, [dispatch, mode]);

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {editWord && (
        <EditWordModal
          open={!!editWord}
          onClose={() => setEditWord(null)}
          word={editWord}
        />
      )}
    </div>
  );
}
