import { Folders } from "lucide-react";
import Header from "../../../components/header/Header";
import Title from "@/src/components/header/Title";

import NoProject from "@/src/components/my-projects/noProject";
import LastestPanel from "@/src/components/my-projects/lastestPanel";
import AllProjecPanel from "@/src/components/my-projects/allProjectPanel";
import SearchBar from "@/src/components/searchbar/searchBar";

export default function Page() {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
        <Header>
          <Title icon={<Folders size={40} />}>โครงการของฉัน</Title>
        </Header>
        <SearchBar />

        <LastestPanel />
        <AllProjecPanel />
        {/*<NoProject />*/}
      </main>
    </>
  );
}
