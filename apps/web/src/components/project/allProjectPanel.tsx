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
}: {
  projects: Project[];
  userId: string;
  setProjects: Dispatch<SetStateAction<Project[]>>;
  showTitle?: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columns: ColumnDef<Project>[] = [
    { accessorKey: 'name' },
    {
      accessorKey: 'type',
      filterFn: (row, id, value: string[]) => {
        return value.includes(row.getValue(id));
      },
    },
    { accessorKey: 'id' },
    { accessorKey: 'projectCode' },
    {
      accessorKey: 'isJoined',
      accessorFn: (row) => joinedProjects.has(row.id),
    },
    {
      accessorKey: 'status',
      filterFn: (row, id, value: string[]) => {
        return value.includes(row.getValue(id));
      },
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
  // Mock joined projects
  const joinedProjects = new Set([
    '2ac28761-83ee-41f7-80a9-c0a8560f048f',
    'eb660d51-da16-4fa6-920d-b44564ef740e',
  ]);

  return (
    <div className={cn(`space-y-5 pb-10`, showTitle ? 'pt-5' : 'pt-0')}>
      {showTitle ? (
        <div className="font-sukhumvit font-bold text-lg">ทั้งหมด</div>
      ) : null}
      <div className="flex flex-row space-x-5">
        <DataTableFacetedFilter
          title="สถานะ"
          options={filterProjectStatus}
          column={table.getColumn('status')}
        />
        <DataTableFacetedFilter
          title="ประเภท"
          options={projectTypeMap}
          column={table.getColumn('type')}
        />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-col-2 grid-row-2 gap-x-8 gap-y-10 ">
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
