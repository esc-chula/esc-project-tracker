"use cliet";
import AllDocumentCard from "./allDocumentCard";
import SelectType from "./selectType";
import { filterStatus, filterType } from "@/src/styles/enumMap";
import { useState, useEffect } from "react";
import { FillingType } from "@/src/interface/filling";

export default function AllDocumentPanel({
  fillings,
}: {
  fillings: FillingType[];
}) {
  const [filteredFillings, setFilteredFillings] =
    useState<FillingType[]>(fillings);
  const [status, setStatus] = useState<string>("all");
  const [type, setType] = useState<string>("11");

  useEffect(() => {
    if (status === "all" && type === "11") {
      setFilteredFillings(fillings);
    } else if (status === "all") {
      setFilteredFillings(
        fillings.filter((filling) => filling.type.toString() === type)
      );
    } else if (type === "11") {
      setFilteredFillings(
        fillings.filter((filling) => filling.status === status)
      );
    } else {
      setFilteredFillings(
        fillings.filter(
          (filling) =>
            filling.status === status && filling.type.toString() === type
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
      <div className="grid lg:grid-cols-3 md:grid-col-2 w-[55vw] gid-row-2 gap-x-4 gap-y-4 pr-8">
        {filteredFillings.map((filling) => (
          <AllDocumentCard
            key={filling.id}
            fillingId={filling.id}
            projectCode={filling.projectCode}
            fillingCode={filling.fillingCode}
            fillingName={filling.name}
            fillingStatus={filling.status}
          />
        ))}
      </div>
    </div>
  );
}
