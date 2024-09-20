import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { TextMyProject, buttonColors } from '@/src/styles/enumMap';
import Link from 'next/link';
import { Button } from '../ui/button';
import type { FilingStatus } from '@/src/constant/enum';
import type { FilingType } from '@/src/interface/filing';

export const columns: ColumnDef<FilingType>[] = [
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="วันที่ดำเนินการ" />;
    },
    cell: ({ row }) => (
      <div className="capitalize w-36">
        {new Date(row.getValue('updatedAt')).toLocaleTimeString('th-TH', {
          year: '2-digit',
          month: 'short',
          day: '2-digit',
        })}
      </div>
    ),
  },
  {
    accessorKey: 'รหัสเอกสาร',
    accessorFn: (row) => row.projectCode + '-' + row.FilingCode,
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
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ชื่อเอกสาร" />;
    },
    cell: ({ row }) => (
      <div className="w-60 line-clamp-1">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'status',
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="สถานะ" />;
    },
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
  {
    accessorKey: 'detailsPath',
    accessorFn: (row) => '/project/' + row.projectId + '/' + row.id,
    header: () => null,
    cell: ({ row }) => (
      <Link href={row.getValue('detailsPath')}>
        <Button variant="link" className="underline px-0">
          ดูรายละเอียด
        </Button>
      </Link>
    ),
  },
];
