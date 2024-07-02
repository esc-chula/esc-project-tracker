import { Home } from "lucide-react"
import Header from "../../../components/header/header"
import Title from "@/src/components/header/title"
import MyProjectData from "@/src/components/project/myProjectData"
import { StatusTable } from "@/src/components/status/StatusTable"
import { FilingStatus } from "@/src/constant/enum"
import { FilingType } from "@/src/interface/filing"
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
export default function Page() {
  return (
    <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
      <Header>
        <Title icon={<Home size={40} />}>หน้าหลัก</Title>
      </Header>
      <section className="mt-5 shadow-lg rounded-xl">
        <StatusTable data={mockData} compact />
      </section>
      <MyProjectData />
    </main>
  )
}
