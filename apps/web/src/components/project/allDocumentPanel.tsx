"use client";
import AllDocumentCard from "./allDocumentCard";
import SelectType from "../filter/selectType";
import { filterStatus, filterType } from "@/src/styles/enumMap";
import { useState, useEffect } from "react";
import { FilingType } from "@/src/interface/filing";

export default function AllDocumentPanel({
  Filings,
}: {
  Filings: FilingType[];
}) {
  const [filteredFilings, setFilteredFilings] = useState<FilingType[]>(Filings);
  const [status, setStatus] = useState<string>("all");
  const [type, setType] = useState<string>("11");

  useEffect(() => {
    if (status === "all" && type === "11") {
      setFilteredFilings(Filings);
    } else if (status === "all") {
      setFilteredFilings(
        Filings.filter((Filing) => Filing.type.toString() === type)
      );
    } else if (type === "11") {
      setFilteredFilings(Filings.filter((Filing) => Filing.status === status));
    } else {
      setFilteredFilings(
        Filings.filter(
          (Filing) =>
            Filing.status === status && Filing.type.toString() === type
        )
      );
    }
    console.log(status);
  }, [status, type]);

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
          items={filterType}
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
          />
        ))}
      </div>
    </div>
  );
}
