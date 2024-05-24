"use client";
import { MockFilling, MockProject } from "@/src/mock/type";
import SearchBar from "../searchbar/searchBar";
import { mockFillings } from "@/src/mock/data";
import { FileText } from "lucide-react";
import NoDocument from "./noDocument";
import AllDocumentPanel from "./allDocumentPanel";
import PopoverAddDocument from "./popoverAddDocument";
import { useRouter } from "next/navigation";

const fillings: MockFilling[] = mockFillings;

export default function MyDocumentData() {
  return (
    <div className="space-y-4">
      <div className="w-[50vw] flex flex-row space-x-4">
        <div className="font-sukhumvit text-lg flex items-center font-bold">
          <FileText style={{ marginRight: "10" }} />
          เอกสาร
        </div>
        <SearchBar
          fillings={fillings}
          projects={[]}
          placeholder="ค้นหาเอกสาร"
          projectFunc={() => {}}
          fillingFunc={() => {}}
        />
        <div className="flex items-center">
          <PopoverAddDocument />
        </div>
      </div>
      {fillings.length === 0 ? (
        <NoDocument />
      ) : (
        <AllDocumentPanel fillings={fillings} />
      )}
    </div>
  );
}
