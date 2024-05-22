import { Folders } from "lucide-react";
import Header from "../../../../components/header/Header";
import Title from "@/src/components/header/Title";
import Subtitle from "@/src/components/header/Subtitle";
import LastestPanel from "@/src/components/my-projects/lastestPanel";
import AllProjecPanel from "@/src/components/my-projects/allProjectPanel";
import AllDocumentPanel from "@/src/components/my-projects/allDocumentPanel";

export default function Page({ params }: { params: { projectId: string } }) {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px]">
        <Header>
          <Subtitle
            project="9025 (ชื่อโครงการ)หยก่เห่เดนำว่"
            projectId="123"
            // document="9025-1111 (ชื่อโครงการ)หยก่เห่เดนำว่"
          />
        </Header>
        Main Content
        <AllDocumentPanel />
      </main>
    </>
  );
}
