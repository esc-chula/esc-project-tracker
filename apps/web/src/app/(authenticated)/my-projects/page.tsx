import { Folders } from "lucide-react";
import Header from "../../../components/header/Header";
import Title from "@/src/components/header/Title";

import NoProject from "@/src/components/my-projects/noProject";

export default function Page() {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
        <Header>
          <Title icon={<Folders size={40} />}>โครงการของฉัน</Title>
          {/*<Subtitle
            project="9025 (ชื่อโครงการ)หยก่เห่เดนำว่"
            projectId="123"
            // document="9025-1111 (ชื่อโครงการ)หยก่เห่เดนำว่"
        />*/}
        </Header>
        <div className="h-12 bg-red">Search zone</div>

        {/*<div className="h-12 bg-red">Search zone</div>
        <LastestPanel />
      <AllProjecPanel />*/}
        {<NoProject />}
      </main>
    </>
  );
}
