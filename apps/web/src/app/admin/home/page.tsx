'use client';
import { ArrowRight, Home, Radio, FileSearch } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import { StatusTable } from '@/src/components/status/statusTable';
import { FilingStatus } from '@/src/constant/enum';
import type { FilingType } from '@/src/interface/filing';
import { Button } from '@/src/components/ui/button';
import type { Project, ProjectWithLastOpen } from '@/src/interface/project';
import SearchPanel from '@/src/components/all-projects/searchPanel';
import LatestPanel from '@/src/components/project/latestPanel';
import { getUserId } from '@/src/service/auth';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import getProjectsByUserId from '@/src/service/project/getProjectsByUserId';
import type { UserFiling } from '@/src/interface/user-filing';
import findUserFilingOrderByLastOpen from '@/src/service/user-filing/findUserFilingOrderByLastOpen';
import findLatestFilings from '@/src/service/filing/findLatestFilings';
import { toast } from '@/src/components/ui/use-toast';

export default function Page() {
  const [isContinued, setIsContinued] = useState(true);
  const [isReturned, setIsReturned] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const [filingsDataWithProject, setFilingsDataWithProject] = useState<
    FilingType[]
  >([]);
  const [projectsWithLastOpenData, setProjectsWithLastOpenData] = useState<
    ProjectWithLastOpen[]
  >([]);

  const [filingsRawData, setFilingsRawData] = useState<FilingType[]>([]);
  const [latestFilings, setLatestFilings] = useState<FilingType[]>([]);

  const [filingsWithLastOpen, setFilingsWithLastOpen] = useState<UserFiling[]>(
    [],
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const [
          filingsData,
          projectsData,
          filingsDataWithLastOpen,
          latestFilingsData,
        ] = await Promise.all([
          getFilingsByUserId(userId),
          getProjectsByUserId(userId),
          findUserFilingOrderByLastOpen(userId),
          findLatestFilings(),
        ]);
        setFilingsDataWithProject(filingsData);
        setProjectsWithLastOpenData(projectsData);
        setFilingsWithLastOpen(filingsDataWithLastOpen);
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
        />
      </section>
      <section className="w-full mt-7">
        <div className="flex items-center justify-between gap-3 h-10">
          <span className="flex items-center gap-2 w-0 grow">
            <Radio className="w-5 h-5 shrink-0" />
            <div className="font-bold">สถานะเอกสารล่าสุด</div>
          </span>
          <Link href="/admin/status">
            <Button variant="link">
              <span className="flex items-center gap-1">
                ดูสถานะทั้งหมด
                <ArrowRight className="w-5 h-5 shrink-0" />
              </span>
            </Button>
          </Link>
        </div>
      </section>
      <section className="flex items-end mt-5 w-full text-gray-500">
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
      <section className="mt-5 shadow-lg rounded-xl">
        <StatusTable data={latestFilings} compact />
      </section>
      <section className="w-full mt-12">
        <div className="flex items-center justify-between gap-3 h-10">
          <span className="flex items-center gap-2 w-0 grow">
            <FileSearch className="w-5 h-5 shrink-0" />
            <div className="font-bold">การตรวจสอบล่าสุด</div>
          </span>
          <Link href="/admin/projects">
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
        <LatestPanel filingsWithLastOpen={filingsWithLastOpen} compact />
      </section>
    </main>
  );
}
