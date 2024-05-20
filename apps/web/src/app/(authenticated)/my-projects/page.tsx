import { Folders } from "lucide-react"
import Header from "../../../components/header/Header"
import Title from "@/src/components/header/Title"
import Subtitle from "@/src/components/header/Subtitle"

export default function Page() {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px]">
        <Header>
          <Title icon={<Folders size={40} />}>โครงการของฉัน</Title>
          {/* <Subtitle
            project="9025(ชื่อโครงการ)หยก่เห่เดนำว่"
            projectId="123"
            document="9025-1111(ชื่อโครงการ)หยก่เห่เดนำว่"
          /> */}
        </Header>
        Main Content
      </main>
    </>
  )
}
