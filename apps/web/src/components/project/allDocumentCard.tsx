"use client";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.tsx";
import PopoverEditDocument from "./popoverEditDocument.tsx";
import PopoverDeleteDocument from "./popoverDeleteDocument.tsx";
import type { FilingStatus } from "@/src/constant/enum.ts";
import { buttonColors, TextMyProject } from "@/src/styles/enumMap";
import { useEffect, useState } from "react";

export default function AllDocumentCard({
  FilingId,
  projectCode,
  FilingCode,
  FilingName,
  FilingStatus,
  deleteThisCardFunc,
  updateThisCardFunc,
}: {
  FilingId: string;
  projectCode: string;
  FilingCode: string;
  FilingName: string;
  FilingStatus: FilingStatus;
  deleteThisCardFunc: (id: string) => void;
  updateThisCardFunc: (id: string, newName: string) => void;
}) {
  const [fName, setFName] = useState<string>(FilingName);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    if (isDeleted) {
      deleteThisCardFunc(FilingId);
    }
  }, [isDeleted]);

  useEffect(() => {
    if (fName !== FilingName) {
      updateThisCardFunc(FilingId, fName);
    }
  }, [fName]);

  return (
    <div className="bg-background shadow-xl rounded-lg space-y-14 pt-2 hover:cursor-pointer hover:shadow-2xl duration-300">
      <div
        className="flex justify-end p-2 py-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical />
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="start"
            className="w-auto flex flex-col"
          >
            <PopoverEditDocument
              oldFilingName={FilingName}
              filingId={FilingId}
              setNewNameParentFunc={(newName) => {
                setFName(newName);
              }}
            />
            <PopoverDeleteDocument
              filingId={FilingId}
              setDeletedParentFunc={(deleted: boolean) => {
                setIsDeleted(deleted);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-2xl font-bold text-center">ตัวอย่างเอกสาร</div>
      <div className="bg-[#E3E3E3] p-3 space-y-2 rounded-lg ">
        <div className="text-2xl font-bold text-start">
          {projectCode} - {FilingCode}
          <div className="font-medium text-base overflow-hidden whitespace-nowrap text-ellipsis">
            {fName || "-- ไม่มีชื่อ --"}
          </div>
        </div>
        <div
          className={`inline-block rounded-lg text-center py-2 px-3 text-sm font-bold font-sukhumvit min-w-[60%] ${buttonColors[FilingStatus]}`}
        >
          {TextMyProject[FilingStatus]}
        </div>
      </div>
    </div>
  );
}
