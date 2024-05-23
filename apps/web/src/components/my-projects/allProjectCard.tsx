import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { EllipsisVertical } from "lucide-react";
import ExitProject from "./exitProject";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PopoverEditDocument from "./popoverEditDocument";
import PopoverDeleteDocument from "./popoverDeleteDocument";
import PopoverExitProject from "./popoverExitProject";

export default function AllProjectCard() {
  return (
    <div className="bg-background border-black border-2 rounded-lg space-y-14 p-5">
      <div className="flex justify-end">
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical />
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="start"
            className="w-auto flex flex-col"
          >
            <PopoverExitProject />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <div className="text-4xl font-bold text-center">
          9090
          <div className="font-medium text-base overflow-hidden whitespace-nowrap text-ellipsis">
            โครงการของฉันหหหหหหacscascs
          </div>
        </div>
      </div>
    </div>
  );
}
