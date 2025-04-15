'use client';
import { ArrowRight, Home, FileSearch, Folders } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import { DataTable } from '@/src/components/status/dataTable';
import { FilingStatus } from '@/src/constant/enum';
import type { Filing } from '@/src/interface/filing';
import { Button } from '@/src/components/ui/button';
import type { Project, ProjectWithLastOpen } from '@/src/interface/project';
import SearchPanel from '@/src/components/all-projects/searchPanel';
import LatestPanel from '@/src/components/project/latestPanel';
import { getUserId } from '@/src/service/auth';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import getProjectsByUserId from '@/src/service/project/getProjectsByUserId';
import findLatestFilings from '@/src/service/filing/findLatestFilings';
import { toast } from '@/src/components/ui/use-toast';

export default function Page() {
  const [isContinued, setIsContinued] = useState(true);
  const [isReturned, setIsReturned] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const [filingsDataWithProject, setFilingsDataWithProject] = useState<
    Filing[]
  >([]);
  const [projectsWithLastOpenData, setProjectsWithLastOpenData] = useState<
    ProjectWithLastOpen[]
  >([]);

  const [filingsRawData, setFilingsRawData] = useState<Filing[]>([]);
  const [latestFilings, setLatestFilings] = useState<Filing[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const [filingsData, projectsData, latestFilingsData] =
          await Promise.all([
            getFilingsByUserId(userId),
            getProjectsByUserId(userId),
            findLatestFilings(),
          ]);

        setFilingsDataWithProject(filingsData);
        setProjectsWithLastOpenData(projectsData);
        setFilingsRawData(latestFilingsData);
        const filteredFilings = latestFilingsData.filter(
          (filing) => filing.status === FilingStatus.WAIT_FOR_SECRETARY,
        );
        setLatestFilings(filteredFilings);
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

  const enableContinue = () => {
    setIsContinued(true);
    setIsReturned(false);
    setIsApproved(false);
    const filteredFilings = filingsRawData.filter(
      (filing) => filing.status === FilingStatus.WAIT_FOR_SECRETARY,
    );
    setLatestFilings(filteredFilings);
  };

  const enableReturn = () => {
    setIsContinued(false);
    setIsReturned(true);
    setIsApproved(false);
    const filteredFilings = filingsRawData.filter(
      (filing) => filing.status === FilingStatus.RETURNED,
    );
    setLatestFilings(filteredFilings);
  };

  const enableApprove = () => {
    setIsContinued(false);
    setIsReturned(false);
    setIsApproved(true);
    const filteredFilings = filingsRawData.filter(
      (filing) => filing.status === FilingStatus.APPROVED,
    );
    setLatestFilings(filteredFilings);
  };

  const projectsData = projectsWithLastOpenData.map(
    (project: { project: Project }) => project.project,
  );
  const router = useRouter();
  const redirectToProject = (project: Project | Filing) => {
    router.push(`/admin/project/${project.id}/info`);
  };
  const redirectToFiling = (filing: Filing) => {
    router.push(`/admin/project/${filing.projectId}/${filing.id}`);
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
          <Link href="/admin/projects">
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
        <LatestPanel projectsWithLastOpen={projectsWithLastOpenData} compact />
      </section>
      <section className="w-full mt-8">
        <div className="flex items-center justify-between gap-3 h-6">
          <span className="flex items-center gap-2 w-0 grow">
            <FileSearch className="w-5 h-5 shrink-0" />
            <div className="font-bold">เอกสารล่าสุด</div>
          </span>
          <Link href="/admin/status">
            <Button variant="link">
              <span className="flex items-center gap-1">
                เอกสารทั้งหมด
                <ArrowRight className="w-5 h-5 shrink-0" />
              </span>
            </Button>
          </Link>
        </div>
      </section>
      <section className="flex items-end mt-6 w-full text-black">
        <div className={`border-b-2 ${isContinued ? 'border-black' : ''}`}>
          <Button
            variant="ghost"
            className={isContinued ? 'font-bold text-black' : ''}
            onClick={enableContinue}
          >
            <span>ดำเนินการ</span>
          </Button>
        </div>
        <div className={`border-b-2 ${isReturned ? 'border-rose-500' : ''}`}>
          <Button
            variant="ghost"
            className={` ${isReturned ? 'font-bold text-rose-500 hover:text-rose-500' : ''}`}
            onClick={enableReturn}
          >
            <span>ตีกลับ</span>
          </Button>
        </div>
        <div className={`border-b-2 ${isApproved ? 'border-green-400' : ''}`}>
          <Button
            variant="ghost"
            className={
              isApproved ? 'font-bold text-green-400 hover:text-green-400' : ''
            }
            onClick={enableApprove}
          >
            <span>อนุมัติ</span>
          </Button>
        </div>
        <hr className="border-t-2 w-full" />
      </section>
      <section className="mt-5">
        <DataTable data={latestFilings} compact />
      </section>
    </main>
  );
}
