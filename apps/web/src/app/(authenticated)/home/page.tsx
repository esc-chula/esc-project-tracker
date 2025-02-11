'use client';
import { ArrowRight, Folders, Home, Radio } from 'lucide-react';
import Header from '../../../components/header/header';
import Title from '@/src/components/header/title';
import MyProjectData from '@/src/components/project/myProjectData';
import { StatusTable } from '@/src/components/status/statusTable';
import { FilingType } from '@/src/interface/filing';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import getProjectsByUserId from '@/src/service/project/getProjectsByUserId';
import { Project, ProjectWithLastOpen } from '@/src/interface/project';
import SearchPanel from '@/src/components/all-projects/searchPanel';
import { getJwtPayload } from '@/src/service/auth';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [filingsDataWithProject, setFilingsDataWithProject] = useState<
    FilingType[]
  >([]);
  const [projectsWithLastOpen, setProjectsWithLastOpen] = useState<
    ProjectWithLastOpen[]
  >([]);
  const [username, setUsername] = useState('');
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const payload = await getJwtPayload();
      const [filingsDataWithProjectData, projectsWithLastOpenData] =
        await Promise.all([
          getFilingsByUserId(payload.sub).catch((err) => {
            return [] as FilingType[];
          }),
          getProjectsByUserId(payload.sub).catch((err) => {
            return [] as ProjectWithLastOpen[];
          }),
        ]);
      setFilingsDataWithProject(filingsDataWithProjectData);
      setProjectsWithLastOpen(projectsWithLastOpenData);
      setUsername(payload.username);
    };
    fetchData();
  }, []);

  const projectsData = useMemo(
    () => projectsWithLastOpen.map((project) => project.project),
    [projectsWithLastOpen],
  );
  const redirectToProject = (project: Project | FilingType) => {
    router.push(`/project/${project.id}`);
  };
  const redirectToFiling = (filing: FilingType) => {
    router.push(`/project/${filing.projectId}/${filing.id}`);
  };
  return (
    <main className="py-10 px-6">
      <Header username={username}>
        <Title icon={<Home size={40} />}>หน้าหลัก</Title>
      </Header>
      <section className="mt-8">
        <SearchPanel
          filings={filingsDataWithProject}
          projects={projectsData}
          placeHolder="ค้นหาโครงการหรือเอกสาร"
          projectFunc={redirectToProject}
          filingFunc={redirectToFiling}
        />
      </section>
      <section className="w-full mt-7">
        <div className="flex items-center justify-between gap-3 h-10">
          <span className="flex items-center gap-2 w-0 grow">
            <Radio className="w-5 h-5 shrink-0" />
            <div className="font-bold">สถานะเอกสารล่าสุด</div>
          </span>
          <Link href="/status">
            <Button variant="link">
              <span className="flex items-center gap-1">
                ดูสถานะทั้งหมด
                <ArrowRight className="w-5 h-5 shrink-0" />
              </span>
            </Button>
          </Link>
        </div>
      </section>
      <section className="mt-5 shadow-lg rounded-xl">
        <StatusTable data={filingsDataWithProject} compact />
      </section>
      <section className="w-full mt-12">
        <div className="flex items-center justify-between gap-3 h-10">
          <span className="flex items-center gap-2 w-0 grow">
            <Folders className="w-5 h-5 shrink-0" />
            <div className="font-bold">โครงการของฉัน</div>
          </span>
          <Link href="/projects">
            <Button variant="link">
              <span className="flex items-center gap-1">
                ดูโครงการทั้งหมด
                <ArrowRight className="w-5 h-5 shrink-0" />
              </span>
            </Button>
          </Link>
        </div>
      </section>
      <section className="rounded-xl bg-gray-200 px-7 pt-9 mb-4 pb-5 mt-4">
        <MyProjectData
          compact
          filingsData={filingsDataWithProject}
          projectsWithLastOpenData={projectsWithLastOpen}
        />
      </section>
    </main>
  );
}
