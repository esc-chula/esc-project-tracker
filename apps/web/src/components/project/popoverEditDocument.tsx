"use client";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import updateFilingName from "@/src/service/updateFiling";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";

export default function PopoverEditDocument({
  filingId,
  oldFilingName,
  setNewNameParentFunc,
}: {
  filingId: string;
  oldFilingName: string;
  setNewNameParentFunc: (newName: string) => void;
}) {
  const [name, setName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const submitUpdate = async () => {
    if (name === "") {
      toast({
        title: "ไม่สำเร็จ",
        description: "กรุณากรอกชื่อเอกสาร",
        isError: true,
      });
      return;
    }

    try {
      const data = await updateFilingName({
        filingId,
        filingName: name,
      });
      if (data) {
        toast({
          title: "สำเร็จ",
          description: `เอกสาร ${oldFilingName} ถูกเปลี่ยนชื่อเป็น ${data.name}`,
          isError: false,
        });
        setNewNameParentFunc(data.name);
        setIsOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ไม่สำเร็จ",
          description: error.message,
          isError: true,
        });
      }
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-row p-2 space-x-3 hover:cursor-pointer">
          <SquarePen />
          <div className="">แก้ไขชื่อเอกสาร</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขชื่อเอกสาร</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg space-y-4">
          <input
            type="text"
            placeholder={oldFilingName}
            value={name}
            onChange={(e) => {setName(e.target.value.trim())}}
            className="border-black border-2 w-full p-2 rounded-lg"
          ></input>
          <div className="text-end">
            <button
              className="bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold"
              onClick={submitUpdate}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
