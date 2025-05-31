"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

export type CaseEvent = {
  id: string;
  title: string;
  event_type: string;
  notes?: string;
  event_date: Date;
};

export const columnsEvent: ColumnDef<CaseEvent>[] = [
  {
    accessorKey: "event_type",
    header: "Event Type",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "event_date",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div>{format(new Date(row.getValue("event_date")), "dd/MM/yyyy")}</div>
      );
    },
  },
];
