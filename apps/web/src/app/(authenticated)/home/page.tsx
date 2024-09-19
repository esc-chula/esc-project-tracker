import { ArrowRight, Folders, Home, Radio } from 'lucide-react';
import Header from '../../../components/header/header';
import Title from '@/src/components/header/title';
import MyProjectData from '@/src/components/project/myProjectData';
import { StatusTable } from '@/src/components/status/StatusTable';
import { FilingType } from '@/src/interface/filing';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import getProjectsByUserId from '@/src/service/project/getProjectsByUserId';
import { ProjectWithLastOpen } from '@/src/interface/project';
import SearchPanel from '@/src/components/all-projects/searchPanel';
import { getUserId } from '@/src/service/auth';

export default async function Page() {
  //TODO : Change the userId to the actual userId
  const userId = await getUserId();
  console.log(userId);
  const [filingsDataWithProject, projectsWithLastOpenData] = await Promise.all([
    getFilingsByUserId(userId).catch((err) => {
      console.error(err);
      return [] as FilingType[];
    }),
    getProjectsByUserId(userId).catch((err) => {
      console.error(err);
      return [] as ProjectWithLastOpen[];
    }),
  ]);

  const projectsData = projectsWithLastOpenData.map(
    (project) => project.project,
  );
  return (
    <main className="w-full pl-15 pr-5 pt-[68px] h-min-[100vh]">
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
          projectsWithLastOpenData={projectsWithLastOpenData}
        />
      </section>
    </main>
  );
}
