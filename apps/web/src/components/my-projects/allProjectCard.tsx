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

export default function AllProjectCard() {
  return (
    <div className="bg-background border-black border-2 rounded-lg space-y-14 p-5">
      <div className="flex justify-end">
        <ExitProject />
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
