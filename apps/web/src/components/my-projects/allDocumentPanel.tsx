"use cliet";
import { MockFilling } from "@/src/mock/type";
import AllDocumentCard from "./allDocumentCard";
import SelectType from "./selectType";
import { filterStatus } from "@/src/constant/enumMap";
import { useState, useEffect } from "react";

export default function AllDocumentPanel({
  fillings,
}: {
  fillings: MockFilling[];
}) {
  const [filteredFillings, setFilteredFillings] =
    useState<MockFilling[]>(fillings);
  const [status, setStatus] = useState<string>("all");

  useEffect(() => {
    if (status === "all") {
      setFilteredFillings(fillings);
    } else {
      setFilteredFillings(
        fillings.filter((filling) => filling.status === status)
      );
    }
    console.log(status);
  }, [status]);

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
      </div>
      <div className="grid lg:grid-cols-3 md:grid-col-2 w-[55vw] gid-row-2 gap-x-4 gap-y-4 pr-8">
        {filteredFillings.map((filling) => (
          <AllDocumentCard
            key={filling.id}
            fillingId={filling.id}
            fillingCode={filling.code}
            fillingName={filling.name}
            fillingStatus={filling.status}
          />
        ))}
      </div>
    </div>
  );
}
