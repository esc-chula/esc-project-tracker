"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { HiDocumentAdd } from "react-icons/hi";
import { filingTypeMap } from "@/src/constant/type";
import { useState } from "react";
import createFiling from "@/src/service/createFiling";

export default function PopoverAddDocument({
  children,
  projectId,
}: {
  children?: React.ReactNode;
  projectId: string;
}) {
  const [filingType, setFilingType] = useState<number>(0);
  const [filingName, setFilingName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const submitCreate = async () => {
    if (filingName !== "") {
      const success = await createFiling(projectId, filingName, filingType);

      if (success) {
        alert("เพิ่มเอกสารสำเร็จ");
        setOpen(true);
      }
    } else {
      alert("กรุณากรอกชื่อเอกสาร");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <div className="flex items-center text-red hover:cursor-pointer">
            <HiDocumentAdd size={30} />
          </div>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>เอกสารใหม่</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg space-y-7">
          <input
            type="text"
            placeholder="ชื่อเอกสาร"
            className="border-black border-2 w-full p-2 rounded-lg"
            value={filingName}
            onChange={(e) => setFilingName(e.target.value)}
            required
          ></input>

          <div className="font-sukhumvit font-semibold">
            ประเภทเอกสาร *
            <select
              id="documentType"
              className="border-black border-2 w-full p-2 rounded-lg"
              defaultValue={0}
              value={filingType}
              onChange={(e) => setFilingType(parseInt(e.target.value))}
            >
              {filingTypeMap.map((type) => (
                <option value={type.value} key={type.value}>
                  {type.value.toString()}
                  {"  "} {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="text-end">
            <button
              className="bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold"
              onClick={submitCreate}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
