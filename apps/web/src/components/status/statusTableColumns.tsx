import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { FilingStatus } from '@/src/constant/enum';
import type { FilingType } from '@/src/interface/filing';
import { TextMyProject, textColors } from '@/src/styles/enumMap';
import { DataTableColumnHeader } from './dataTableColumnHeader';
import PDFButton from './pdfButton';

require('dayjs/locale/th');

dayjs.extend(relativeTime);
dayjs.locale('th');

export const columns: ColumnDef<FilingType>[] = [
  {
    accessorKey: 'รหัสเอกสาร',
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
    accessorFn: (row) => row.project?.name,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ชื่อโครงการ" />;
    },
    cell: ({ row }) => <div className="">{row.getValue('ชื่อโครงการ')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ชื่อเอกสาร" />;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'ownerName',
    accessorFn: (row) => row.user?.username,
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="justify-center"
          column={column}
          title="นิสิตผู้รับผิดชอบ"
        />
      );
    },
    cell: ({ row }) => (
      <div className="line-clamp-1 text-center">
        {row.getValue('ownerName')}
      </div>
    ),
  },
  {
    accessorKey: 'ownerTel',
    accessorFn: (row) => row.user?.tel,
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="justify-center"
          column={column}
          title="เบอร์โทรศัพท์"
        />
      );
    },
    cell: ({ row }) => (
      <div className="line-clamp-1 text-center">{row.getValue('ownerTel')}</div>
    ),
  },
  {
    accessorKey: 'status',
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="justify-center"
          column={column}
          title="สถานะ"
        />
      );
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as FilingStatus;

      return (
        <div
          className={`w-full inline-block text-center text-sm font-medium ${textColors[status]}`}
        >
          {TextMyProject[status]}
        </div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    accessorFn: (row) => dayjs(row.updatedAt).fromNow(),
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
    accessorFn: (row) => `${row.projectId}/${row.id}`,
    header: () => null,
    cell: ({ row }) => <PDFButton row={row} />,
  },
  {
    accessorKey: 'type',
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
