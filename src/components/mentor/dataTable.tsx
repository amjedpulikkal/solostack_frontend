"use client"

import * as React from "react"
// import {
//   CaretSortIcon,
//   ChevronDownIcon,
//   DotsHorizontalIcon,
// } from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    user: 3006,
    userName: "rewrsuccess",
    email: "ken99@yahoo.com",
    status: "active"

  },
  {
    id: "3u1reuv4",
    user: 242,
    userName: "rewrsuccess",
    email: "Abe45@gmail.com",
    status: "active"
  },
  {
    id: "derv1ws0",
    user: 837,
    userName: "rewrprocessing",
    email: "Monserrat44@gmail.com",
    status: "active"
  },
  {
    id: "5kma53ae",
    user: 874,
    userName: "rewrsuccess",
    email: "Silas22@gmail.com",
    status: "active"
  },
  {
    id: "5kma53ae",
    user: 874,
    userName: "rewrsuccess",
    email: "Silas22@gmail.com",
    status: "active"
  },
  {
    id: "5kma53ae",
    user: 874,
    userName: "rewrsuccess",
    email: "Silas22@gmail.com",
    status: "active"
  },
  {
    id: "5kma53ae",
    user: 874,
    userName: "rewrsuccess",
    email: "Silas22@gmail.com",
    status: "active"
  },
  {
    id: "5kma53ae",
    user: 874,
    userName: "rewrsuccess",
    email: "Silas22@gmail.com",
    status: "active"
  },
  {
    id: "bhqecj4p",
    user: 721,
    userName: "rewrfailed",
    email: "carmella@hotmail.com",
    status: "active"
  },
  {
    id: "bhqecj4p",
    user: 721,
    userName: "rewrfailed",
    email: "carmella@hotmail.com",
    status: "active"
  },
  {
    id: "bhqecj4p",
    user: 721,
    userName: "rewrfailed",
    email: "carmella@hotmail.com",
    status: "active"
  },
  {
    id: "bhqecj4p",
    user: 721,
    userName: "rewrfailed---------",
    email: "carmella@hotmail.com",
    status: "active"
  },
  {
    id: "bhqecj4p",
    user: 721,
    userName: "rewrfailed",
    email: "carmella@hotmail.com",
    status: "active"
  },
  {
    id: "bhqecj4p",
    user: 721,
    userName: "rewrfailed",
    email: "carmella@hotmail.com",
    status: "active"
  },
  {
    id: "bhqecj4p",
    user: 721,
    userName: "rewrfailed",
    email: "carmella@hotmail.com",
    status: "active"
  },
]

export type Payment = {
  id: string
  user: number
  userName: string
  email: string
  status: string
}

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "userName",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        <img src="https://github.com/shadcn.png" className="rounded-full w-10 h-10" alt="" />
      </div>
    ),
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("userName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          status
          {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
  },
]

export function DataTable({rowSelection,setRowSelection}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
 
    
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={!Object.values(rowSelection).length} className="ml-auto">
              Options
              {/* <ChevronDownIcon className="ml-2 h-4 w-4" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">

            <DropdownMenuItem className="capitalize">
              Send mail
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize">
              Push Notification
            </DropdownMenuItem>
            <DropdownMenuItem  className="text-red-600 focus:text-red-500 focus:outline-red-500 ">
              Frizz or block
            </DropdownMenuItem>


          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  )
}
