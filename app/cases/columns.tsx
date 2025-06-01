"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export type Case = {
  id: string;
  title: string;
  description?: string;
  case_type: string;
  court_level?: string;
  client_name: string;
  created_by: string;
  creatded_at: string;
  status: string;
};

export const columns: ColumnDef<Case>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "client_name",
    header: "Client Name",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "case_type",
    header: "Case Type",
  },
  {
    accessorKey: "court_level",
    header: "Court Level",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const formatStatus =
        status === "open"
          ? "Open"
          : status === "in_progress"
            ? "In Progress"
            : "Closed";
      return <span>{formatStatus}</span>;
    },
  },
  {
    accessorKey: "created_by",
    header: "Created By",
  },
  //   {
  //     accessorKey: "role",
  //     header: ({ column }) => {
  //       return (
  //         <div
  //           className="flex items-center cursor-pointer"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Role
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     accessorKey: "department",
  //     header: "Department",
  //   },
  //   {
  //     accessorKey: "job_title",
  //     header: "Job Title",
  //   },
  //   {
  //     accessorKey: "employee_number",
  //     header: "Employee Number",
  //   },
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //   },
  {
    id: "actions",
    cell: ({ row }) => {
      const cases = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/cases/${cases.id}`}>
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <Link href={`/cases/${cases.id}/create-event`}>
                <DropdownMenuItem>Create Event</DropdownMenuItem>
              </Link>
              <Link href={`/cases?editStatus=true&caseId=${cases.id}`}>
                <DropdownMenuItem>Change Status</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
