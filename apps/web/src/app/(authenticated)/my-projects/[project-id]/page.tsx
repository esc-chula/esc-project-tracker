import Header from "../../../../components/header/Header";
import Subtitle from "@/src/components/header/Subtitle";
import MyDocumentData from "@/src/components/my-projects/myDocumentData";

export default function Page({ params }: { params: { projectId: string } }) {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px]">
        <Header>
          <Subtitle project="9025 (ชื่อโครงการ)หยก่เห่เดนำว่" projectId="123" />
        </Header>

        <MyDocumentData />
      </main>
    </>
  );
}
