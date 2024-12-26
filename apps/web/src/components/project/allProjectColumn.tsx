import { ColumnDef } from '@tanstack/react-table';
import { TextMyProject, buttonColors } from '@/src/styles/enumMap';
import Link from 'next/link';
import { Button } from '../ui/button';
import type { FilingStatus } from '@/src/constant/enum';
import type { FilingType } from '@/src/interface/filing';
import { convertDate } from '@/src/lib/utils';
import { Project } from '@/src/interface/project';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'updatedAt',
    header: () => null,
    cell: ({ row }) => (
      <div className="capitalize w-[152px]">
        {convertDate(row.getValue('updatedAt'))}
      </div>
    ),
  },
  {
    accessorKey: 'name',
  },
  {
    accessorKey: 'id',
    header: () => null,
  },
  {
    accessorKey: 'projectCode',
    header: () => null,
    cell: ({ row }) => (
      <div className="w-60 line-clamp-1">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'status',
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    header: () => null,
    cell: ({ row }) => {
      const status = row.getValue('status') as FilingStatus;

      return (
        <div
          className={`w-36 inline-block rounded-lg text-center py-2 px-4 text-xs font-bold min-w-[60%] ${buttonColors[status]}`}
        >
          {TextMyProject[status]}
        </div>
      );
    },
  },
];
