import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { Project } from '@/src/interface/project';
import { filterProjectStatus } from '@/src/styles/enumMap';
import { projectTypeMap } from '@/src/constant/map';
import { cn } from '@/src/lib/utils';
import { DataTableFacetedFilter } from '../filter/dataTableFacetedFilter';
import AllProjectCard from './allProjectCard';

export default function AllProjectPanel({
  projects,
  userId,
  setProjects,
  showTitle = false,
  joinedProjects = new Set(),
}: {
  projects: Project[];
  userId: string;
  setProjects: Dispatch<SetStateAction<Project[]>>;
  showTitle?: boolean;
  joinedProjects?: Set<string>;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columns: ColumnDef<Project>[] = [
    { accessorKey: 'name' },
    {
      accessorKey: 'type',
      filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    },
    { accessorKey: 'id' },
    { accessorKey: 'projectCode' },
    {
      accessorKey: 'isJoined',
      accessorFn: (row) => joinedProjects.has(row.id),
      filterFn: (row, id, value: string[]) =>
        value.includes(String(row.getValue(id))),
    },
    {
      accessorKey: 'status',
      filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    },
  ];
  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className={cn(`space-y-4 pb-10`, showTitle ? 'pt-5' : 'pt-0')}>
      {showTitle ? (
        <div className="font-sukhumvit font-bold text-lg">ทั้งหมด</div>
      ) : null}
      <div className="flex flex-row space-x-5">
        <DataTableFacetedFilter
          title="ฝ่าย"
          options={projectTypeMap}
          column={table.getColumn('type')}
        />
        <DataTableFacetedFilter
          title="สถานะโครงการ"
          options={filterProjectStatus}
          column={table.getColumn('status')}
        />
        <DataTableFacetedFilter
          title="การเข้าร่วม"
          options={[
            { label: 'เข้าร่วม', value: 'true' },
            { label: 'ไม่เข้าร่วม', value: 'false' },
          ]}
          column={table.getColumn('isJoined')}
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-row-2 gap-x-8 gap-y-10 ">
        {table.getRowModel().rows.map((project) => (
          <AllProjectCard
            key={project.id}
            projectId={project.getValue('id')}
            projectCode={project.getValue('projectCode')}
            projectName={project.getValue('name')}
            projectType={project.getValue('type')}
            userId={userId}
            isJoined={project.getValue('isJoined')}
            leaveThisProjectFunc={(id: string) => {
              setProjects((prevProjects: Project[]) =>
                prevProjects.filter((prevProject) => prevProject.id !== id),
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
