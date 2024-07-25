import { Project } from "@/src/interface/project";
import { useRouter } from "next/navigation";

export default function ProjectInfoPanel({
  projectInfo,
}: {
  projectInfo: Project | null;
}) {
  return (
    <div className="flex flex-col max-w-3xl ">
      <div className="space-y-6 bg-lightgray px-6 py-5 rounded-lg ">
        <div className="font-bold text-lg ">
          ชื่อโครงการ
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal text-gray-500 ring-offset-background mt-2">
            {projectInfo?.name || "ไม่พบชื่อโครงการ"}
          </div>
        </div>
        <div className="font-bold text-lg ">
          ประเภทโครงการ
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal text-gray-500 ring-offset-background mt-2">
            {projectInfo?.type || "ไม่พบประเภทโครงการ"}
          </div>
        </div>
        <div className="font-bold text-lg ">
          รายละเอียด
          <div className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal text-gray-500 ring-offset-background mt-2 overflow-y-scroll">
            {projectInfo?.detail || "ไม่มีรายละเอียดโครงการ"}
          </div>
        </div>
        <div className="font-bold text-lg ">ผู้ร่วมโครงการ</div>
        <div className="h-24 overflow-y-scroll">
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
          <div className="">1. นายดุลยวัต คำแก้ว 6430127621</div>
        </div>
      </div>
    </div>
  );
}
