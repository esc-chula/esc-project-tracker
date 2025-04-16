'use client';
import { ArrowRight, FileSearch, Folders, Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Title from '@/src/components/header/title';
import { StatusTable } from '@/src/components/status/statusTable';
import type { Filing } from '@/src/interface/filing';
import { Button } from '@/src/components/ui/button';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import getProjectsByUserId from '@/src/service/project/getProjectsByUserId';
import type { Project, ProjectWithLastOpen } from '@/src/interface/project';
import SearchPanel from '@/src/components/all-projects/searchPanel';
import { getUserId } from '@/src/service/auth';
import LatestPanel from '@/src/components/project/latestPanel';
import { toast } from '@/src/components/ui/use-toast';
import Header from '../../../components/header/header';

export default function Page() {
  const [filingsDataWithProject, setFilingsDataWithProject] = useState<
    Filing[]
  >([]);
  const [projectsWithLastOpen, setProjectsWithLastOpen] = useState<
    ProjectWithLastOpen[]
  >([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const [filingsDataWithProjectData, projectsWithLastOpenData] =
          await Promise.all([
            getFilingsByUserId(userId),
            getProjectsByUserId(userId),
          ]);

        setFilingsDataWithProject(filingsDataWithProjectData);
        setProjectsWithLastOpen(projectsWithLastOpenData);
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'ไม่สำเร็จ',
            description: err.message,
            isError: true,
          });
        }
      }
    };

    void fetchData();
  }, []);

  const projectsData = useMemo(
    () => projectsWithLastOpen.map((project) => project.project),
    [projectsWithLastOpen],
  );
  const redirectToProject = (project: Project | Filing) => {
    router.push(`/project/${project.id}`);
  };
  const redirectToFiling = (filing: Filing) => {
    router.push(`/project/${filing.projectId}/${filing.id}`);
  };
  return (
    <main className="py-10 px-6">
      <Header>
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
        <div className="flex items-center justify-between gap-3 h-6">
          <span className="flex items-center gap-2 w-0 grow">
            <Folders className="w-5 h-5 shrink-0" />
            <div className="font-bold">โครงการล่าสุด</div>
          </span>
          <Link href="/projects">
            <Button variant="link">
              <span className="flex items-center gap-1">
                โครงการทั้งหมด
                <ArrowRight className="w-5 h-5 shrink-0" />
              </span>
            </Button>
          </Link>
        </div>
      </section>
      <section className="mt-6">
        <LatestPanel projectsWithLastOpen={projectsWithLastOpen} compact />
      </section>
      <section className="w-full mt-8">
        <div className="flex items-center justify-between gap-3 h-6">
          <span className="flex items-center gap-2 w-0 grow">
            <FileSearch className="w-5 h-5 shrink-0" />
            <div className="font-bold">เอกสารล่าสุด</div>
          </span>
          <Link href="/status">
            <Button variant="link">
              <span className="flex items-center gap-1">
                เอกสารทั้งหมด
                <ArrowRight className="w-5 h-5 shrink-0" />
              </span>
            </Button>
          </Link>
        </div>
      </section>
      <section className="mt-5">
        <StatusTable data={filingsDataWithProject} compact />
      </section>
    </main>
  );
}
