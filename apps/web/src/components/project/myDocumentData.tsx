"use client";
import { MockFiling, MockProject } from "@/src/mock/type";
import SearchBar from "../searchbar/searchBar";
import { mockFilings } from "@/src/mock/data";
import { FileText } from "lucide-react";
import NoDocument from "./noDocument";
import AllDocumentPanel from "./allDocumentPanel";
import PopoverAddDocument from "./popoverAddDocument";
import { useEffect, useState } from "react";
import { FilingType } from "@/src/interface/filing";
import { trpc } from "@/src/app/trpc";
import getFilingByProjectId from "@/src/service/getFilingByProjectId";

export default function MyDocumentData({ projectId }: { projectId: string }) {
  const [Filings, setFilings] = useState<FilingType[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchFilings = async () => {
      const data = await getFilingByProjectId({ projectId });
      setFilings(data);
      setIsFetched(true);
    };
    fetchFilings();
  }, []);

  useEffect(() => {
    console.log(Filings);
  }, [Filings]);

  return (
    <div className="space-y-4 w-[65%]">
      <div className=" flex flex-row space-x-4">
        <div className="font-sukhumvit text-lg flex items-center font-bold">
          <FileText style={{ marginRight: "10" }} />
          เอกสาร
        </div>
        <SearchBar
          Filings={Filings}
          projects={[]}
          placeholder="ค้นหาเอกสาร"
          FilingFunc={() => {}}
        />

        <PopoverAddDocument
          projectId={projectId}
          addFilingToParent={(filing: FilingType) => {
            setFilings((prevFilings) => [...prevFilings, filing]);
          }}
        />
      </div>
      {isFetched && (
        <>
          {Filings.length === 0 ? (
            <NoDocument
              projectId={projectId}
              setNewFilingToParent={(filing: FilingType) => {
                setFilings((prevFilings) => [...prevFilings, filing]);
              }}
            />
          ) : (
            <AllDocumentPanel
              Filings={Filings}
              setFilingsToParentFunc={(Filings: FilingType[]) => {
                setFilings((prevFilings) => Filings);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
