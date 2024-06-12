import { Folders, Home } from "lucide-react"
import Header from "../../../components/header/header"
import Title from "@/src/components/header/title"
import MyProjectData from "@/src/components/project/myProjectData"
import { StatusTable } from "@/src/components/status/StatusTable"

export default function Page() {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
        <Header>
          <Title icon={<Home size={40} />}>หน้าหลัก</Title>
        </Header>
        <StatusTable data={[]} />
        <MyProjectData />
      </main>
    </>
  )
}
