import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { FilingWithDocument } from '@/src/types/filing';

require('dayjs/locale/th');

dayjs.extend(relativeTime);
dayjs.locale('th');

export const filingTabColumns: ColumnDef<FilingWithDocument>[] = [
  {
    accessorKey: 'รหัสเอกสาร',
    accessorFn: (row) => `${row.filing.projectCode}-${row.filing.filingCode}`,
  },
  {
    accessorKey: 'projectName',
    accessorFn: (row) => row.filing.project?.name,
  },
  {
    accessorKey: 'name',
  },
  {
    accessorKey: 'status',
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'updatedAt',
    accessorFn: (row) => dayjs(row.document.updatedAt).fromNow(),
    sortingFn: (rowA, rowB) =>
      dayjs(rowA.original.document.updatedAt).unix() -
      dayjs(rowB.original.document.updatedAt).unix(),
  },
  {
    accessorKey: 'type',
    accessorFn: (row) => row.filing.type,
    filterFn: (row, id, value: string[]) =>
      value.includes(String(row.getValue(id))),
  },
  {
    accessorKey: 'projectType',
    accessorFn: (row) => row.filing.projectCode.slice(0, 2),
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'subType',
    filterFn: (row, id, value: string[]) =>
      value.includes(String(row.getValue(id))),
  },
];
