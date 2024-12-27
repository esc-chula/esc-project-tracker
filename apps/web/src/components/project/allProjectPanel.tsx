import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import type { Project } from '@/src/interface/project';
import { filterProjectStatus } from '@/src/styles/enumMap';
import { projectTypeMap } from '@/src/constant/map';
import SelectType from '../filter/selectType';
import AllProjectCard from './allProjectCard';
import { columns } from './allProjectColumn';

export default function AllProjectPanel({
  projects,
  userId,
  setProjects,
}: {
  projects: Project[];
  userId: string;
  setProjects: Dispatch<SetStateAction<Project[]>>;
}) {
  const [usedProjects, setUsedProjects] = useState<Project[]>(projects);
  const [projectState, setProjectState] = useState<string>('all');
  const [projectType, setProjectType] = useState<string>('all');

  useEffect(() => {
    if (projectState === 'all' && projectType === 'all') {
      setUsedProjects(projects);
    } else if (projectState === 'all') {
      setUsedProjects(
        projects.filter((project) => project.type.toString() === projectType),
      );
    } else if (projectType === 'all') {
      setUsedProjects(
        projects.filter((project) => project.status === projectState),
      );
    } else {
      setUsedProjects(
        projects.filter(
          (project) =>
            project.status === projectState &&
            project.type.toString() === projectType,
        ),
      );
    }
  }, [projectState, projectType, projects]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: usedProjects,
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
  const joinedProjects = new Set(['2ac28761-83ee-41f7-80a9-c0a8560f048f']);

  return (
    <div className="space-y-5 pt-5 pb-10 ">
      <div className="font-sukhumvit font-bold text-lg">ทั้งหมด</div>
      <div className="flex flex-row space-x-5">
        <SelectType
          title="สถานะ"
          items={filterProjectStatus}
          sendValue={(value) => {
            setProjectState(value);
          }}
        />
        <SelectType
          title="ประเภท"
          items={projectTypeMap}
          sendValue={(value) => {
            setProjectType(value);
          }}
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
