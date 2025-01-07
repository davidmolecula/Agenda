export const columns = [
  {
    accessorKey: "name",
    header: () => <div className="w-56 border text-right">Nombre</div>,
    cell: ({ row }) => {
      const name = row.getValue("name")
      return <div className="w-56 border text-right font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="w-48 border  text-right">Descripcion</div>,
    cell: ({ row }) => {
      const description = row.getValue("description")
      return <div className="w-48 border text-right font-medium">{description}</div>;
  },
  },
  {
    accessorKey: "importance",
    header: () => <div className="w-48 border text-right">Importancia</div>,
    cell: ({ row }) => {
      const importance = row.getValue("importance")
      return <div className="w-48 border text-right font-medium">{importance}</div>;
  },
  }
];
