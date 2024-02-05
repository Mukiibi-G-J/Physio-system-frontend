"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Patient = {
  id: string;
  patientno: string;
  lastname: string;
  firstname: string;
  gender: string;
  address: string;
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "patientno",
    header: "Patient No",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "firstname",
    header: "First Name",
  },
  {
    accessorKey: "gender",
    header: "Gender ",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original;

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
              onClick={() => navigator.clipboard.writeText(patient.id)}
            >
              Copy patient ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View patient</DropdownMenuItem>
            <DropdownMenuItem>View patient details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
