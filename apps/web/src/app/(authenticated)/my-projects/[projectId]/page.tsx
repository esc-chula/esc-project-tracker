"use client";
import Header from "../../../../components/header/Header";
import Subtitle from "@/src/components/header/Subtitle";
import MyDocumentData from "@/src/components/my-projects/myDocumentData";
import { mockProject } from "@/src/mock/data";
import { ProjectType } from "@/src/interface/project";

//TODO: Change this to the actual project
const project: ProjectType = mockProject;

export default function Page({
  params,
}: {
  params: { projectId: string; projectName: string; projectCode: string };
}) {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh] ">
        <Header>
          <Subtitle
            project={`${project.projectCode} ${project.name}`}
            projectId={params.projectId as string}
          />
        </Header>

        <MyDocumentData projectId={params.projectId as string} />
      </main>
    </>
  );
}
