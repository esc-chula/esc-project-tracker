import Title from "@/src/components/header/title"
import Header from "@/src/components/header/header"
import { Folders } from "lucide-react"
import NewProjectForm from "@/src/components/new-project/newProjectForm"

export default function Page() {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
        <Header>
          <Title icon={<Folders size={40} />} adminDisplay href="/projects">
            เปิดโครงการใหม่
          </Title>
        </Header>
        <NewProjectForm />
      </main>
    </>
  )
}
