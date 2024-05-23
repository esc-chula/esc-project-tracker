import Header from "../../../../components/header/Header";
import Subtitle from "@/src/components/header/Subtitle";
import MyDocumentData from "@/src/components/my-projects/myDocumentData";
import { mockProject } from "@/src/mock/data";
import { MockProject } from "@/src/mock/type";

const project: MockProject = mockProject;

export default function Page({ params }: { params: { projectId: string } }) {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px]">
        <Header>
          <Subtitle
            project={`${project.code} ${project.name}`}
            projectId={params.projectId}
          />
        </Header>

        <MyDocumentData />
      </main>
    </>
  );
}
