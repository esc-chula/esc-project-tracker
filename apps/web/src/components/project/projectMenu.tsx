import { Project } from '@/src/interface/project';
import ProjectMenuHeader from './projectMenuHeader';
import NoData from '../all-projects/noData';
import ProjectMenuItem from './projectMenuItem';
import SelectType from '../filter/selectType';
import React from 'react';
import {
  departmentProjectItems,
  statusProjectItems,
} from '@/src/constant/filterProject';
import { useToast } from '../ui/use-toast';
import findAllProject from '@/src/service/project/findAllProject';
import findProjectsWithFilter from '@/src/service/project/findProjectsWithFilter';
import hasUserProj from '@/src/service/user-proj/hasUserProj';
import getProjectByProjectId from '@/src/service/project/getProjectByProjectId';
import { getUserId } from '@/src/service/auth';

export default function ProjectMenu({
  searchedProjectId,
  isAdmin,
}: {
  searchedProjectId: string | null;
  isAdmin: boolean;
}) {
  const { toast } = useToast();
  const [departmentProject, setDepartmentProject] =
    React.useState<string>('ALL'); // department that projects belong to
  const [statusProject, setStatusProject] = React.useState<string>('ALL'); // status of project
  const [typeProject, setTypeProject] = React.useState<string>('ALL'); // join or not
  const [projects, setProjects] = React.useState<Project[]>([]);

  async function filterJoin(eachProject: Project): Promise<boolean> {
    const userId = await getUserId();
    const result = await hasUserProj(
      userId,
      eachProject.id,
    );
    return result;
  }
  async function fetchData() {
    try {
      let fetchedProject: Project[];

      if (departmentProject === 'ALL' && statusProject === 'ALL') {
        // case search
        if (searchedProjectId) {
          const projectById = await getProjectByProjectId(searchedProjectId);
          projectById
            ? (fetchedProject = [projectById])
            : (fetchedProject = []);
        } else {
          // case ปกติ
          const fetchedProjectWithLastOpen = await findAllProject();
          fetchedProject = fetchedProjectWithLastOpen.map(
            (project) => project.project,
          );
        }
      } else {
        // case search
        if (searchedProjectId) {
          const projectById = await getProjectByProjectId(searchedProjectId);
          if (projectById) {
            if (
              (departmentProject === 'ALL' ||
                departmentProject === projectById.type) &&
              (statusProject === 'ALL' || statusProject === projectById.status)
            ) {
              fetchedProject = [projectById];
            } else {
              fetchedProject = [];
            }
          } else {
            fetchedProject = [];
          }
        } else {
          // case ปกติ
          fetchedProject = await findProjectsWithFilter(
            statusProject,
            departmentProject,
          );
        }
      }

      if (typeProject === 'ALL') {
        setProjects(fetchedProject);
      } else {
        const filteredProjects = await Promise.all(
          fetchedProject.map(async (project) => {
            const isJoined = await filterJoin(project);
            return (typeProject === 'JOIN') === isJoined ? project : null;
          }),
        );
        setProjects(
          filteredProjects.filter(
            (project): project is Project => project !== null,
          ),
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'ไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
  }
  React.useEffect(() => {
    fetchData();
  }, [departmentProject, statusProject, typeProject, searchedProjectId]);

  return (
    <div className="w-full">
      <div className="w-1/3 lg:w-1/4 grid grid-cols-3 gap-6 mb-5">
        <SelectType
          title="ฝ่าย"
          items={departmentProjectItems}
          sendValue={setDepartmentProject}
        />
        <SelectType
          title="สถานะ"
          items={statusProjectItems}
          sendValue={setStatusProject}
        />
        <SelectType
          title="ทั้งหมด"
          items={[
            { value: 'ALL', label: 'ทั้งหมด' },
            { value: 'JOINED', label: 'เข้าร่วม' },
            { value: 'NOTJOINED', label: 'ไม่ได้เข้าร่วม' },
          ]}
          sendValue={setTypeProject}
        />
      </div>
      {!projects.length ? (
        <NoData
          firstLine="ยังไม่มีโครงการ"
          secondLine="เริ่มเปิดโครงกันเลย !"
        />
      ) : (
        <div className="w-full h-[500px] overflow-x-auto overflow-y-auto rounded-t-xl">
          <table className="w-full text-sm">
            <ProjectMenuHeader isAdmin={isAdmin} />
            <tbody>
              {projects.map((project, index) => (
                <ProjectMenuItem
                  project={project}
                  key={index}
                  index={index + 1}
                  isAdmin={isAdmin}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
