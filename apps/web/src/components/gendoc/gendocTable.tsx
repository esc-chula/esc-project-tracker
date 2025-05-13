'use client';

import { useState } from 'react';
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { typeFilingItemsV2 } from '@/src/constant/filterFiling';
import { projectTypeMap } from '@/src/constant/map';
import type { Gendoc } from '@/src/interface/gendoc';
import { DataTableFacetedFilter } from '../filter/dataTableFacetedFilter';
import StatusTableToolBar from '../status/statusTableToolBar';
import { gendocColumns } from './gendocTableColumns';

export function GendocTable({
  data,
  compact = false,
  userId,
  appendGendoc,
}: {
  data: Gendoc[];
  compact?: boolean;
  userId?: string;
  appendGendoc: (gendocs: Gendoc) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    type: false,
    projectType: false,
    subType: false,
  });

  const table = useReactTable({
    data,
    columns: gendocColumns,
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
    initialState: {
      pagination: {
        pageSize: compact ? 5 : 10,
      },
    },
  });
  const router = useRouter();
  const redirectToGendoc = (gendoc: Gendoc) => {
    router.push(`/gendoc/${gendoc.id}`);
  };

  return (
    <>
      {!compact && (
        <>
          <StatusTableToolBar
            table={table}
            isGendocPage
            gendocFunc={redirectToGendoc}
            userId={userId}
            appendGendoc={appendGendoc}
          />
          <div className="flex flex-row space-x-5 mb-4">
            <DataTableFacetedFilter
              column={table.getColumn('projectType')}
              title="ฝ่าย"
              options={projectTypeMap}
            />
            <DataTableFacetedFilter
              column={table.getColumn('type')}
              title="ประเภทเอกสาร"
              options={typeFilingItemsV2}
            />
          </div>
        </>
      )}

      <Table className="rounded-xl text-base w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-black px-2"
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  redirectToGendoc(row.original);
                }}
                className="hover:bg-gray-200 cursor-pointer transition-colors duration-150"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-0 px-1 h-12">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={gendocColumns.length}
                className="h-24 text-center"
              >
                ไม่พบข้อมูล
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 pb-4 pt-2 pl-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            ย้อนหลัง
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </>
  );
}
