"use client"

import React from "react"
import {
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
import { Button } from "@/src/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import { FilingStatus } from "@/src/constant/enum"
import { columns } from "./StatusTableColumns"
import StatusTableToolBar from "./StatusTableToolBar"

const data: FilingMock[] = [
  {
    id: "m5gr84i91",
    status: FilingStatus.DRAFT,
    name: "Filing 1 weosiyfgowausyh ngcfowauy afgseahgesrytedgsetyh",
    projectCode: "1001",
    documentCode: "9001",
    type: 9,
    createdAt: new Date("2021-08-01T19:11:00"),
    updatedAt: new Date("2021-08-01T19:11:00"),
  },
  {
    id: "m5gr84i92",
    status: FilingStatus.WAIT_FOR_SECRETARY,
    name: "Filing 2",
    projectCode: "1001",
    documentCode: "9002",
    type: 9,
    createdAt: new Date("2021-08-01T19:11:00"),
    updatedAt: new Date("2021-08-01T19:11:00"),
  },
  {
    id: "m5gr84i93",
    status: FilingStatus.WAIT_FOR_STUDENT_AFFAIR,
    name: "Filing 3",
    projectCode: "1001",
    documentCode: "9003",
    type: 9,
    createdAt: new Date("2021-08-01T19:11:00"),
    updatedAt: new Date("2021-08-01T19:11:00"),
  },
  {
    id: "m5gr84i94",
    status: FilingStatus.RETURNED,
    name: "Filing 4",
    projectCode: "1001",
    documentCode: "9004",
    type: 9,
    createdAt: new Date("2021-08-01T19:11:00"),
    updatedAt: new Date("2021-08-01T19:11:00"),
  },
  {
    id: "m5gr84i95",
    status: FilingStatus.APPROVED,
    name: "Filing 5",
    projectCode: "1001",
    documentCode: "9005",
    type: 9,
    createdAt: new Date("2021-08-01T19:11:00"),
    updatedAt: new Date("2021-08-01T19:11:00"),
  },
]

export type FilingMock = {
  id: string
  status: FilingStatus
  name: string
  projectCode: string
  documentCode: string
  type: number
  createdAt: Date
  updatedAt: Date
}

export function StatusTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full pl-15 pr-5">
      <StatusTableToolBar table={table} />
      <Table className="rounded-xl overflow-hidden text-base">
        <TableHeader className="bg-lightpink">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-black px-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-3 py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            ย้อนหลัง
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  )
}
