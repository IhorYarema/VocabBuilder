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

export default function WordsTable() {
  const dispatch = useDispatch();
  const words = useSelector(selectWords);
  const loading = useSelector(selectWordsLoading);

  const [editWord, setEditWord] = useState(null);

  useEffect(() => {
    dispatch(fetchUserWords());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        header: "Word",
        accessorKey: "word",
      },
      {
        header: "Translation",
        accessorKey: "translation",
      },
      {
        header: "Progress",
        cell: ({ row }) => <ProgressBar value={row.original.progress} />,
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <ActionsBtn
            onEdit={() => setEditWord(row.original)}
            onDelete={() => dispatch(deleteWord(row.original._id))}
          />
        ),
      },
    ],
    []
  );

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
