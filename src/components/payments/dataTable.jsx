import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function DataTable({ data, date, columns }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  // Filtrado de datos por fecha seleccionada (Memoizado)
  const comparedData = useMemo(() => {
    const normalizedDate = new Date(date).setHours(0, 0, 0, 0); // Normalizamos la fecha seleccionada
    return data.filter((item) => {
      const itemDate = new Date(item.date).setHours(0, 0, 0, 0); // Normalizamos la fecha de cada item
      return itemDate === normalizedDate; // Solo mantiene los elementos con la misma fecha
    });
  }, [data, date]); // Solo se recalcula cuando `data` o `date` cambian

  // Configuración de la tabla
  const table = useReactTable({
    data: comparedData, // Usamos los datos filtrados
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4  ">
        <Input
          placeholder="Filtrar por nombre"
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) => {
            const newFilterValue = event.target.value;
            table.getColumn("name")?.setFilterValue(newFilterValue);
          }}
          className="max-w-sm"
        />
      </div>
      <table className="flex flex-col gap-10">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th  key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: "pointer" }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="flex flex-col w-96">
          {comparedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                No hay datos para la fecha seleccionada
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="w-48" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default DataTable;
