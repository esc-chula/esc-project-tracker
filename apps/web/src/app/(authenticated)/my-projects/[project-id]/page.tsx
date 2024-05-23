import Header from "../../../../components/header/Header";
import Subtitle from "@/src/components/header/Subtitle";
import AllDocumentPanel from "@/src/components/my-projects/allDocumentPanel";

import NoDocument from "@/src/components/my-projects/noDocument";

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
        <div className="h-12 bg-red">Search zone</div>
        <AllDocumentPanel />
        {/*<NoDocument />*/}
      </main>
    </>
  );
}
