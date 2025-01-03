import type { ColumnDef } from '@tanstack/react-table';
import type { Project } from '@/src/interface/project';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'name',
  },
  {
    accessorKey: 'type',
  },
  {
    accessorKey: 'id',
  },
  {
    accessorKey: 'projectCode',
  },
  {
    accessorKey: 'status',
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
];
