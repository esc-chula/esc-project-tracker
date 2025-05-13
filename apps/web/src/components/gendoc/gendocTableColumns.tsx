import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Gendoc } from '@/src/interface/gendoc';
import { DataTableColumnHeader } from '../status/dataTableColumnHeader';
import PDFButton from './pdfButton';

require('dayjs/locale/th');

dayjs.extend(relativeTime);
dayjs.locale('th');

export const gendocColumns: ColumnDef<Gendoc>[] = [
  {
    accessorKey: 'รหัสเอกสาร',
    size: 0,
    enableResizing: false,
    accessorFn: (row) => `${row.projectCode}-${row.filingCode}`,
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="justify-center"
          column={column}
          title="รหัสเอกสาร"
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('รหัสเอกสาร')}</div>
    ),
  },
  {
    accessorKey: 'ชื่อโครงการ',
    accessorFn: (row) => row.customProjectName,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ชื่อโครงการ" />;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[200px]">
        {row.getValue('ชื่อโครงการ')}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ชื่อเอกสาร" />;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[200px]">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    accessorFn: (row) => dayjs(row.updatedAt).fromNow(),
    sortingFn: (rowA, rowB) =>
      dayjs(rowB.original.updatedAt).unix() -
      dayjs(rowA.original.updatedAt).unix(),
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="justify-center"
          column={column}
          title="อัปเดตล่าสุด"
        />
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue('updatedAt')}</div>
    ),
  },
  {
    accessorKey: 'detailsPath',
    size: 0,
    enableResizing: false,
    accessorFn: (row) => `${row.projectId}/${row.id}`,
    header: () => null,
    cell: ({ row }) => <PDFButton row={row} />,
  },
  {
    accessorKey: 'type',
    accessorFn: (row) => `${row.type}${row.subType ? `-${row.subType}` : ''}`,
    filterFn: (row, id, value: string[]) =>
      value.includes(String(row.getValue(id))),
  },
  {
    accessorKey: 'projectType',
    accessorFn: (row) => row.project?.type,
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'subType',
    filterFn: (row, id, value: string[]) =>
      value.includes(String(row.getValue(id))),
  },
];
