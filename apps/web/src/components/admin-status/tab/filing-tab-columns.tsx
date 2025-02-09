import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { FilingsWithDocument } from '@/src/types/filing';
import getProjectByProjectId from '@/src/service/project/getProjectByProjectId';

require('dayjs/locale/th');

dayjs.extend(relativeTime);
dayjs.locale('th');

export const filingTabColumns: ColumnDef<FilingsWithDocument>[] = [
  {
    accessorKey: 'รหัสเอกสาร',
    accessorFn: (row) => `${row.filing.projectCode}-${row.filing.filingCode}`,
  },
  {
    accessorKey: 'projectName',
    accessorFn: async (row) => {
      const project = await getProjectByProjectId(row.filing.projectId);
      return project?.name ?? 'ไม่พบโครงการ';
    },
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
