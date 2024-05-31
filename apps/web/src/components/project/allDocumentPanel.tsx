"use client";
import AllDocumentCard from "./allDocumentCard";
import SelectType from "../filter/selectType";
import { filterStatus } from "@/src/styles/enumMap";
import { useState, useEffect } from "react";
import { FilingType } from "@/src/interface/filing";
import { filingTypeMap, projectTypeMap } from "@/src/constant/type";

export default function AllDocumentPanel({
  Filings,
  setFilingsToParentFunc,
}: {
  Filings: FilingType[];
  setFilingsToParentFunc: (Filings: FilingType[]) => void;
}) {
  const [allFilings, setAllFilings] = useState<FilingType[]>(Filings);
  const [filteredFilings, setFilteredFilings] = useState<FilingType[]>(Filings);
  const [status, setStatus] = useState<string>("all");
  const [type, setType] = useState<string>("all");

  useEffect(() => {
    if (status === "all" && type === "all") {
      setFilteredFilings(allFilings);
    } else if (status === "all") {
      setFilteredFilings(
        allFilings.filter((Filing) => Filing.type.toString() === type)
      );
    } else if (type === "all") {
      setFilteredFilings(Filings.filter((Filing) => Filing.status === status));
    } else {
      setFilteredFilings(
        allFilings.filter(
          (Filing) =>
            Filing.status === status && Filing.type.toString() === type
        )
      );
    }
    console.log(status);
  }, [status, type, allFilings, Filings]);

  useEffect(() => {
    setFilingsToParentFunc(allFilings);
  }, [allFilings]);

  useEffect(() => {
    setAllFilings(Filings);
  }, [Filings]);

  return (
    <div className="space-y-5 pt-5 pb-10">
      <div className="flex flex-row space-x-5">
        <SelectType
          title="สถานะ"
          items={filterStatus}
          sendValue={(value) => {
            setStatus(value);
          }}
        />
        <SelectType
          title="ประเภท"
          items={filingTypeMap}
          sendValue={(value) => {
            setType(value);
          }}
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-col-2 gid-row-2 gap-x-4 gap-y-4 pr-8">
        {filteredFilings.map((Filing) => (
          <AllDocumentCard
            key={Filing.id}
            FilingId={Filing.id}
            projectCode={Filing.projectCode}
            FilingCode={Filing.FilingCode}
            FilingName={Filing.name}
            FilingStatus={Filing.status}
            deleteThisCardFunc={(id: string) => {
              setAllFilings((prevFilings) =>
                prevFilings.filter((Filing) => Filing.id !== id)
              );
            }}
            updateThisCardFunc={(id: string, newName: string) => {
              setAllFilings((prevFilings) =>
                prevFilings.map((Filing) =>
                  Filing.id === id ? { ...Filing, name: newName } : Filing
                )
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
