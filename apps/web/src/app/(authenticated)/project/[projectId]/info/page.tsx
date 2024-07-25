"use client";
import Header from "@/src/components/header/header";
import Title from "@/src/components/header/title";
import ProjectInfoPanel from "@/src/components/project-info/projectInfoPanel";
import { toast } from "@/src/components/ui/use-toast";
import { Project } from "@/src/interface/project";
import getProjectByProjectId from "@/src/service/getProjectByProjectId";
import { Folders } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectInfoPage() {
  const params = useParams();
  const { projectId } = params;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectInfo = await getProjectByProjectId(String(projectId));
        setProject(projectInfo);

        //TODO GET joinUserByProjectId
        /**** */
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: "โหลดข้อมูลโครงการไม่สำเร็จ",
            description: err.message,
            isError: true,
          });
        }
      }
    };
    fetchProject();
  }, []);

  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
        <Header>
          <Title icon={<Folders size={40} />} href="/projects">
            รายละเอียดโครงการ
          </Title>
        </Header>
        {project && <ProjectInfoPanel projectInfo={project} />}
      </main>
    </>
  );
}
