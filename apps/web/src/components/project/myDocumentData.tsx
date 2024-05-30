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
import AlertCustom from "../alert/alertCustom";

export default function MyDocumentData({ projectId }: { projectId: string }) {
  const [Filings, setFilings] = useState<FilingType[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchFilings = async () => {
      if (projectId) {
        const data = await getFilingByProjectId({ projectId });
        setFilings(data);
        setIsFetched(true);
      }
    };
    fetchFilings();
  }, [projectId]);

  useEffect(() => {
    console.log(Filings);
  }, [Filings]);

  return (
    <div className="space-y-4 w-[65%] ">
      <div className="flex flex-row justify-between items-center">
        <div className="font-sukhumvit text-lg sm::text-base flex items-center font-bold ">
          <FileText style={{ marginRight: "10" }} />
          เอกสาร
        </div>
        <div className="flex-grow mx-4">
          <SearchBar
            Filings={Filings}
            projects={[]}
            placeholder="ค้นหาเอกสาร"
            FilingFunc={() => {}}
          />
        </div>

        <div className="">
          <PopoverAddDocument
            projectId={projectId}
            addFilingToParent={(filing: FilingType) => {
              setFilings((prevFilings) => [...prevFilings, filing]);
            }}
          />
        </div>
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
