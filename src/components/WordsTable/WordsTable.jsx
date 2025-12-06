import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { deleteWord } from "../../redux/words/operations";
import { selectWordsLoading } from "../../redux/words/selectors";

import ActionsBtn from "./ActionsBtn/ActionsBtn";
import EditWordModal from "./EditWordModal/EditWordModal";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function WordsTable({
  items = [],
  mode = "dictionary",
  onAddToDictionary,
}) {
  const dispatch = useDispatch();
  const loading = useSelector(selectWordsLoading);

  const [editWord, setEditWord] = useState(null);

  const columns = useMemo(() => {
    const base = [
      {
        id: "word",
        header: "Word",
        accessorKey: "en",
      },
      {
        id: "translation",
        header: "Translation",
        accessorKey: "ua",
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
      },
    ];

    if (mode === "dictionary") {
      base.push(
        {
          id: "progress",
          header: "Progress",
          cell: ({ row }) => <ProgressBar value={row.original.progress || 0} />,
        },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <ActionsBtn
              onEdit={() => setEditWord(row.original)}
              onDelete={() => {
                dispatch(deleteWord(row.original._id));
              }}
            />
          ),
        }
      );
    }

    if (mode === "recommend") {
      base.push({
        id: "add",
        header: "Add",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => onAddToDictionary(row.original._id)}
          >
            Add to dictionary
          </button>
        ),
      });
    }

    return base;
  }, [dispatch, mode]);

  const table = useReactTable({
    data: items || [],
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
