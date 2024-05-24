import { Radio } from "lucide-react"
import Header from "../../../components/header/Header"
import Title from "@/src/components/header/Title"
import DocumentStatusStepper from "@/src/components/status/StatusStepper"

export default function Page() {
  return (
    <>
      <main className="w-full pt-[68px]">
        <div className="pl-15 pr-5">
          <Header>
            <Title icon={<Radio size={40} />}>ติดตามสถานะ</Title>
          </Header>
        </div>

        <div className="bg-lightpink flex flex-col pt-12 pb-5 items-center mt-5 w-full">
          <h3 className="mb-8 text-2xl text-intania font-bold">ขั้นตอนการส่งเอกสาร</h3>
          <DocumentStatusStepper status="DEFAULT" />
        </div>
      </main>
    </>
  )
}
