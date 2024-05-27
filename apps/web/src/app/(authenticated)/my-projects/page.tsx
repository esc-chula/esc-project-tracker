import Header from "../../../components/header/header"
import Subtitle from "@/src/components/header/subtitle"

export default function Page() {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px]">
        <Header>
          {/* <Title icon={<Folders size={40} />} href="/my-projects">
            โครงการของฉัน
          </Title> */}
          <Subtitle
            project="9025 (ชื่อโครงการ)หยก่เห่เดนำว่"
            projectId="123"
            // document="9025-1111 (ชื่อโครงการ)หยก่เห่เดนำว่"
          />
        </Header>
        <div className="h-[1000px]">Main Content</div>
      </main>
    </>
  )
}
