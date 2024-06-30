"use client";
import AllDocumentCard from "./allDocumentCard";
import SelectType from "../filter/selectType";
import { filterStatus } from "@/src/styles/enumMap";
import { useState, useEffect } from "react";
import { Filing } from "@/src/interface/filing";
import { filingTypeMap } from "@/src/constant/Map";

export default function AllDocumentPanel({
  Filings,
  setFilingsToParentFunc,
}: {
  Filings: Filing[];
  setFilingsToParentFunc: (Filings: Filing[]) => void;
}) {
  const [allFilings, setAllFilings] = useState<Filing[]>(Filings);
  const [filteredFilings, setFilteredFilings] = useState<Filing[]>(Filings);
  const [status, setStatus] = useState<string>("all");
  const [type, setType] = useState<string>("all");

  useEffect(() => {
    if (status === "all" && type === "all") {
      setFilteredFilings(allFilings);
    } else if (status === "all") {
      setFilteredFilings(
        allFilings.filter((filing) => filing.type.toString() === type)
      );
    } else if (type === "all") {
      setFilteredFilings(Filings.filter((filing) => filing.status === status));
    } else {
      setFilteredFilings(
        allFilings.filter(
          (filing) =>
            filing.status === status && filing.type.toString() === type
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
        {filteredFilings.map((filing) => (
          <AllDocumentCard
            key={filing.id}
            FilingId={filing.id}
            projectCode={filing.projectCode}
            FilingCode={filing.FilingCode}
            FilingName={filing.name}
            FilingStatus={filing.status}
            deleteThisCardFunc={(id: string) => {
              setAllFilings((prevFilings) =>
                prevFilings.filter((prevFiling) => prevFiling.id !== id)
              );
            }}
            updateThisCardFunc={(id: string, newName: string) => {
              setAllFilings((prevFilings) =>
                prevFilings.map((prevFiling) =>
                  prevFiling.id === id ? { ...prevFiling, name: newName } : prevFiling
                )
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
