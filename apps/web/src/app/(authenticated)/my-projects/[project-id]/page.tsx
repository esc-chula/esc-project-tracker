"use client";
import Header from "../../../../components/header/Header";
import Subtitle from "@/src/components/header/Subtitle";
import MyDocumentData from "@/src/components/my-projects/myDocumentData";
import { mockProject } from "@/src/mock/data";
import { MockProject } from "@/src/mock/type";
import { useEffect } from "react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/src/interface/project";

const project: ProjectType = mockProject;

export default function Page() {
  const router = useRouter();
  // TODO ใช้เป็น dynamic
  const projectId = "bddd6d85-d61a-4331-84f8-63ad43d000c4";

  useEffect(() => {}, [projectId]);
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh] ">
        <Header>
          <Subtitle
            project={`${project.projectCode} ${project.name}`}
            projectId={projectId as string}
          />
        </Header>

        <MyDocumentData projectId={projectId as string} />
      </main>
    </>
  );
}
