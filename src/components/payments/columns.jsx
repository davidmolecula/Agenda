import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { es } from "date-fns/locale/es";
import { format } from "date-fns";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-36 h-10 text-right font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue("name")
      return <div className="w-36 h-12 text-sm flex items-center justify-center  font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="w-48 h-10  flex items-center justify-center">Descripcion</div>,
    cell: ({ row }) => {
      const description = row.getValue("description")
      return <div className="w-48  h-12 text-sm flex items-center justify-center font-medium">{description}</div>;
  },
  },
  {
    accessorKey: "importance",
    header: () => <div className="w-36 !m-0 !p-0 h-10  flex items-center justify-center">Importancia</div>,
    cell: ({ row }) => {
      const importance = row.getValue("importance")
      return <div className="w-36 h-12 flex items-center justify-center   font-medium">{importance}</div>;
  },
  },
  {
    accessorKey: "date",
    header: () => <div className="w-24 h-10 !m-0 !p-0  flex items-center justify-center">Fecha</div>,
    cell: ({ row }) => {
      const date = row.getValue("date")
      return <div className="w-24 h-12 flex items-center justify-center font-medium">{format(date,'PP',{locale: es})}</div>;
  },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
