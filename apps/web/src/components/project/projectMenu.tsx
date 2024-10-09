import { Project } from '@/src/interface/project';
import ProjectMenuHeader from './projectMenuHeader';
import NoData from '../all-projects/noData';
import ProjectMenuItem from './projectMenuItem';
import SelectType from '../filter/selectType';
import { useEffect, useState } from 'react';
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
  const [departmentProject, setDepartmentProject] = useState<string>('ALL'); // department that projects belong to
  const [statusProject, setStatusProject] = useState<string>('ALL'); // status of project
  const [typeProject, setTypeProject] = useState<string>('ALL'); // join or not
  const [projects, setProjects] = useState<Project[]>([]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  async function filterJoin(eachProject: Project): Promise<boolean> {
    const result = await hasUserProj(userId, eachProject.id);
    return result;
  }
  async function fetchData() {
    try {
      let fetchedProject: Project[];
      // TODO: receive projects from selectTab and filter here
      if (departmentProject === 'ALL' && statusProject === 'ALL') {
        // case search
        if (searchedProjectId) {
          const projectById = await getProjectByProjectId(searchedProjectId);
          projectById
            ? (fetchedProject = [projectById])
            : (fetchedProject = []);
        } else {
          // case ปกติ
          fetchedProject = await findAllProject();
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
        // TODO: use Promise.all correctly
        const filteredProjects = await Promise.all(
          fetchedProject.map(async (project) => {
            const isJoined = await filterJoin(project);
            return (typeProject === 'JOINED') === isJoined ? project : null;
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
  useEffect(() => {
    fetchData();
  }, [departmentProject, statusProject, typeProject, searchedProjectId]);

  return (
    <div className="w-full">
      <div className="flex gap-6 mb-5">
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
                  key={project.id}
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
