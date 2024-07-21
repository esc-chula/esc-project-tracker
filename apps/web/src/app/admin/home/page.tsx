import { ArrowRight, Folders, Home, Radio } from "lucide-react"
import Header from "@/src/components/header/header"
import Title from "@/src/components/header/title"
import MyProjectData from "@/src/components/project/myProjectData"
import { StatusTable } from "@/src/components/status/StatusTable"
import { FilingStatus } from "@/src/constant/enum"
import { FilingType } from "@/src/interface/filing"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import getFilingsByUserId from "@/src/service/getFilingsByUserId"
import getProjectsByUserId from "@/src/service/getProjectsByUserId"
import { ProjectWithLastOpen } from "@/src/interface/project"
import SearchPanel from "@/src/components/all-projects/searchPanel"
const mockData: FilingType[] = [
  {
    id: "m5gr84i91",
    status: FilingStatus.DRAFT,
    name: "Filing 1 weosiyfgowausyh ngcfowauy afgseahgesrytedgsetyh",
    projectCode: "1001",
    FilingCode: "9001",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i92",
    status: FilingStatus.WAIT_FOR_SECRETARY,
    name: "Filing 2",
    projectCode: "1001",
    FilingCode: "9002",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i93",
    status: FilingStatus.WAIT_FOR_STUDENT_AFFAIR,
    name: "Filing 3",
    projectCode: "1001",
    FilingCode: "9003",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i94",
    status: FilingStatus.RETURNED,
    name: "Filing 4",
    projectCode: "1001",
    FilingCode: "9004",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i95",
    status: FilingStatus.APPROVED,
    name: "Filing 5",
    projectCode: "1001",
    FilingCode: "9005",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i95",
    status: FilingStatus.APPROVED,
    name: "Filing 5",
    projectCode: "1001",
    FilingCode: "9005",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i95",
    status: FilingStatus.APPROVED,
    name: "Filing 5",
    projectCode: "1001",
    FilingCode: "9005",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i95",
    status: FilingStatus.APPROVED,
    name: "Filing 5",
    projectCode: "1001",
    FilingCode: "9005",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i95",
    status: FilingStatus.APPROVED,
    name: "Filing 5",
    projectCode: "1001",
    FilingCode: "9005",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i95",
    status: FilingStatus.APPROVED,
    name: "Filing 5",
    projectCode: "1001",
    FilingCode: "9005",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
  {
    id: "m5gr84i95",
    status: FilingStatus.APPROVED,
    name: "Filing 5",
    projectCode: "1001",
    FilingCode: "9005",
    type: 9,
    user: {},
    project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  },
]
export default async function Page() {
  //TODO : Change the userId to the actual userId
  const [filingsDataWithProject, projectsWithLastOpenData] = await Promise.all([
    getFilingsByUserId("d1c0d106-1a4a-4729-9033-1b2b2d52e98a").catch((err) => {
      console.error(err)
      return [] as FilingType[]
    }),
    getProjectsByUserId("d1c0d106-1a4a-4729-9033-1b2b2d52e98a").catch((err) => {
      console.error(err)
      return [] as ProjectWithLastOpen[]
    }),
  ])

  const projectsData = projectsWithLastOpenData.map((project) => project.project)
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
  )
}
