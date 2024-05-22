import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { EllipsisVertical } from "lucide-react";

export default function AllProjectCard() {
  return (
    <div className="bg-background border-black border-2 rounded-lg space-y-14 p-5">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger>
            <EllipsisVertical />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
